# ===== CAMBIA SOLO ESTO =====
$RutaFotos="C:\Users\x\Downloads\x"
# ============================

$Cantidad=5
$Calidad=65
$Resolucion="1366x768"
$EventsFile = Join-Path $PSScriptRoot "js\events.js"

function Normalizar-Nombre([string]$texto) {
    $texto = $texto.Normalize([System.Text.NormalizationForm]::FormD)
    $texto = $texto -replace '\p{M}', ''
    return ($texto -replace '[^\p{L}\p{N}]', '').ToLowerInvariant()
}

function Convertir-Js([string]$valor) {
    $valor = $valor.Replace('\', '/')
    $valor = $valor.Replace("'", "\'")
    return "'$valor'"
}

if(-not (Test-Path -LiteralPath $EventsFile)) {
    Write-Error "No se encuentra el archivo $EventsFile"
    exit 1
}

$contenidoEventos = Get-Content -LiteralPath $EventsFile -Raw -Encoding UTF8
$eventosEncontrados = [regex]::Matches($contenidoEventos, "name:\s*'([^']*)'")
$carpetaEvento = $null
$nombreEvento = $null

foreach($segmento in ($RutaFotos -split '[\\/]')) {
    foreach($eventoEncontrado in $eventosEncontrados) {
        $nombre = $eventoEncontrado.Groups[1].Value
        if((Normalizar-Nombre $segmento) -eq (Normalizar-Nombre $nombre)) {
            $carpetaEvento = $segmento
            $nombreEvento = $nombre
            break
        }
    }

    if($carpetaEvento) {
        break
    }
}

if(-not $carpetaEvento) {
    Write-Error "No se ha encontrado un evento para la carpeta de $RutaFotos"
    exit 1
}

$carpetaWeb = Get-ChildItem -LiteralPath (Join-Path $PSScriptRoot "fotos") -Directory -ErrorAction SilentlyContinue |
    Where-Object {
        (Normalizar-Nombre $_.Name) -eq (Normalizar-Nombre $carpetaEvento)
    } |
    Select-Object -First 1 -ExpandProperty Name

if(-not $carpetaWeb) {
    $carpetaWeb = $carpetaEvento.ToLowerInvariant()
}

$rutaFotosWeb = Join-Path $PSScriptRoot "fotos\$carpetaWeb"
if(-not (Test-Path -LiteralPath $rutaFotosWeb)) {
    New-Item -ItemType Directory -Path $rutaFotosWeb -Force -ErrorAction Stop | Out-Null
}

$imagenes = Get-ChildItem -LiteralPath $RutaFotos -File |
    Where-Object {
        $_.Extension -match '^\.(jpg|jpeg|png)$'
    }

if($imagenes.Count -lt $Cantidad){
    Write-Host "No hay suficientes fotos"
    exit
}

$seleccion = $imagenes | Get-Random -Count $Cantidad

Write-Host "Fotos seleccionadas:"
$seleccion | ForEach-Object { Write-Host $_.Name }

$miniaturas = @()

foreach($img in $seleccion){

    $nombre = [System.IO.Path]::GetFileNameWithoutExtension($img.Name).TrimStart('_') -replace '-min$', ''

    $salida = Join-Path $RutaFotos "$nombre.webp"

    magick `
        "$($img.FullName)" `
        -resize $Resolucion `
        -quality $Calidad `
        -strip `
        "$salida"

    if($LASTEXITCODE -ne 0) {
        throw "No se pudo convertir la imagen $($img.Name)"
    }

    $destino = Join-Path $rutaFotosWeb "$nombre.webp"
    if([System.IO.Path]::GetFullPath($salida) -ne [System.IO.Path]::GetFullPath($destino)) {
        Copy-Item -LiteralPath $salida -Destination $destino -Force -ErrorAction Stop
    }

    $miniaturas += "$nombre.webp"
}

$rutasMiniaturas = $miniaturas | ForEach-Object { "../fotos/$carpetaWeb/$_" }
$thumbnailJs = Convertir-Js $rutasMiniaturas[0]
$additionalJs = ($rutasMiniaturas | Select-Object -Skip 1 | ForEach-Object { Convertir-Js $_ }) -join ', '

$patronEvento = "(?s)\{\s*id:\s*'[^']*',\s*name:\s*'" + [regex]::Escape($nombreEvento) + "'\s*,.*?\n\s*\}"
$evento = [regex]::Match($contenidoEventos, $patronEvento)

if(-not $evento.Success) {
    throw "No se ha encontrado el objeto del evento $nombreEvento en $EventsFile"
}

$objetoEvento = $evento.Value
$patronThumbnail = "thumbnail:\s*'[^']*'"
$patronAdditional = "additionalImages:\s*\[[^\]]*\]"

if(-not [regex]::IsMatch($objetoEvento, $patronThumbnail) -or -not [regex]::IsMatch($objetoEvento, $patronAdditional)) {
    throw "El evento $nombreEvento no tiene el formato esperado"
}

$objetoEvento = [regex]::Replace($objetoEvento, $patronThumbnail, "thumbnail: $thumbnailJs")
$objetoEvento = [regex]::Replace($objetoEvento, $patronAdditional, "additionalImages: [$additionalJs]")
$contenidoEventos = $contenidoEventos.Remove($evento.Index, $evento.Length).Insert($evento.Index, $objetoEvento)
$utf8SinBom = New-Object -TypeName System.Text.UTF8Encoding -ArgumentList $false
[System.IO.File]::WriteAllText($EventsFile, $contenidoEventos, $utf8SinBom)

Write-Host ""
Write-Host "Listo. WebP generados, copiados a $rutaFotosWeb y evento $nombreEvento actualizado en $EventsFile."
