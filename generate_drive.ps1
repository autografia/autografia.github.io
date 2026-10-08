# ============================================================
# generate_drive.ps1
# Regenera js\drive_photos.js a partir de las carpetas de Google Drive
# declaradas en js\events.js, sin necesidad de API key:
# descarga la vista de carpeta (embeddedfolderview) y extrae los ids
# de las imágenes (filtra vídeos y otros archivos).
#
# Uso:
#   .\generate_drive.ps1                            # refresca todas las carpetas
#   .\generate_drive.ps1 -Evento "Moralet 2026"     # solo esa (el resto se reutiliza)
# ============================================================
param(
    [string]$Evento
)

$ErrorActionPreference = "Stop"

$EventsFile = Join-Path $PSScriptRoot "js\events.js"
$OutFile    = Join-Path $PSScriptRoot "js\drive_photos.js"

if (-not (Test-Path -LiteralPath $EventsFile)) {
    Write-Error "No se encuentra el archivo $EventsFile"
    exit 1
}

function Limpiar-Nombre([string]$nombre) {
    # Quita emojis/símbolos finales y espacios sobrantes para el comentario
    return (($nombre -replace "[^\p{L}\p{N}\s&.'-]+$", "")).Trim()
}

# ids ya generados (para -Evento: no vuelvo a descargar las demás carpetas)
$lineasExistentes = @{}
if (Test-Path -LiteralPath $OutFile) {
    $contenidoSalida = Get-Content -LiteralPath $OutFile -Raw -Encoding UTF8
    foreach ($m in [regex]::Matches($contenidoSalida, "(?m)^  '([^']+)': '[^']*',\s*//.*$")) {
        $lineasExistentes[$m.Groups[1].Value] = $m.Value
    }
}

$contenidoEventos = Get-Content -LiteralPath $EventsFile -Raw -Encoding UTF8
$pares = [regex]::Matches($contenidoEventos, "id:\s*'([^']+)',\s*\r?\n\s*name:\s*'([^']*)'")
if ($pares.Count -eq 0) {
    Write-Error "No se han encontrado eventos con id y name en $EventsFile"
    exit 1
}

$lineas   = @()
$total    = 0
$filtro   = if ($Evento) { (Limpiar-Nombre $Evento).ToLowerInvariant() } else { $null }

foreach ($par in $pares) {
    $carpeta = $par.Groups[1].Value
    $nombre  = Limpiar-Nombre $par.Groups[2].Value

    # Con -Evento solo se descarga la carpeta indicada; el resto se reutiliza
    if ($filtro -and ($nombre.ToLowerInvariant() -notlike "*$filtro*")) {
        if ($lineasExistentes.ContainsKey($carpeta)) {
            $lineas += $lineasExistentes[$carpeta]
            continue
        }
        Write-Host "Sin datos previos de '$nombre': se descargará igualmente"
    }

    $url = "https://drive.google.com/embeddedfolderview?id=$carpeta#grid"
    Write-Host "Descargando: $nombre ..."
    $html = (Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 60).Content

    $ids = @()
    foreach ($bloque in ([regex]::Split($html, '<div class="flip-entry"'))) {
        $mId   = [regex]::Match($bloque, 'id="entry-([^"]+)"')
        $mTipo = [regex]::Match($bloque, 'drive-thirdparty\.googleusercontent\.com/\d+/type/([^"]+)"')
        if (-not $mId.Success -or -not $mTipo.Success) { continue }
        if (-not $mTipo.Groups[1].Value.StartsWith("image/")) { continue }  # vídeos u otros
        $ids += $mId.Groups[1].Value
    }

    if ($ids.Count -eq 0) {
        Write-Warning "No se han encontrado fotos en '$nombre' ($carpeta). ¿Carpeta vacía o cambió el formato de Drive?"
    }

    Write-Host ("  {0} fotos" -f $ids.Count)
    $total += $ids.Count
    $lineas += "  '$carpeta': '$($ids -join ",")',  // $nombre ($($ids.Count) fotos)"
}

if ($lineas.Count -ne $pares.Count) {
    Write-Error "Número de líneas inesperado: $($lineas.Count) frente a $($pares.Count) eventos"
    exit 1
}

$header = @"
// ============================================================
// Archivo GENERADO AUTOMÁTICAMENTE por generate_drive.ps1
// No edites a mano: ejecuta  .\generate_drive.ps1  para regenerarlo.
// Formato: id de la carpeta de Drive -> ids de sus fotos (separadas por coma)
// Las fotos se sirven desde Google Drive: https://lh3.googleusercontent.com/d/<id>=w800
// ============================================================
const drivePhotos = {
"@

$texto  = $header + "`n"
$texto += ($lineas -join "`n") + "`n"
$texto += "};`n"

$utf8SinBom = New-Object -TypeName System.Text.UTF8Encoding -ArgumentList $false
[System.IO.File]::WriteAllText($OutFile, $texto, $utf8SinBom)

Write-Host ""
Write-Host "Listo: $($lineas.Count) carpetas y $total fotos escritas en $OutFile"
