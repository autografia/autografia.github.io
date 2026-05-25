// Datos de los eventos
const events = [
    {
        id: '13gB73_dwR6pEtg6ScsvNqe04GoTumyOK',
        name: 'Moralet 2026 ⛰️',
        thumbnail: '../fotos/moralet_2026/DSC3141-min.webp',
        additionalImages: ['../fotos/moralet_2026/DSC3065-min.webp', '../fotos/moralet_2026/DSC3114-min.webp', '../fotos/moralet_2026/DSC3121-min.webp', '../fotos/moralet_2026/DSC3141-min.webp', '../fotos/moralet_2026/DSC3145-min.webp']
    },
    {
        id: '1NCM_x1WBC1CDQRfhSdX1jXHosJ5S3Ssp',
        name: 'ROOW 2025 🇩🇪',
        thumbnail: '../fotos/roow/DSC1539-min.webp',
        additionalImages: ['../fotos/roow/DSC1544-min.webp', '../fotos/roow/DSC1557-min.webp', '../fotos/roow/DSC1587-min.webp', '../fotos/roow/DSC1610-min.webp']
    },
    {
        id: '13AvmE6E4rN0vbE2jn8xKCrYkvRgJpseq',
        name: 'Hyundai i20N 🇩🇪',
        thumbnail: '../fotos/i20n/DSC2930-min.webp',
        additionalImages: ['../fotos/i20n/DSC2937-min.webp', '../fotos/i20n/DSC2942-min.webp', '../fotos/i20n/DSC2944-min.webp', '../fotos/i20n/DSC2913-min.webp']
    },
    {
        id: '10RfZw4ORIMHHEwTDULoxI6u_mU6Ib0Wa',
        name: 'VW Polo GTI 🇩🇪',
        thumbnail: '../fotos/polo/DSC_8892-min.webp',
        additionalImages: ['../fotos/polo/DSC_8886-min.webp', '../fotos/polo/DSC_8884-min.webp', '../fotos/polo/DSC_8876-min.webp', '../fotos/polo/DSC_8873-min.webp']
    },
    {
        id: '1M6H-n2ykN5imWNBCexQ7DeGf-jWjStRN',
        name: 'Alfa Romeo MiTo QV🍀',
        thumbnail: '../fotos/mito/DSC0431-min.webp',
        additionalImages: ['../fotos/mito/DSC0417-min.webp', '../fotos/mito/DSC0443-min.webp', '../fotos/mito/DSC0418-min.webp', '../fotos/mito/DSC0424-min.webp']
    },
    {
        id: '1N8d3ekIVEBwqahrkDUrskilyWCyK1j4F',
        name: 'Renault 5 Bimotor 🇫🇷',
        thumbnail: '../fotos/r5_bimotor/DSC_6226-Editar.webp',
        additionalImages: ['../fotos/r5_bimotor/DSC_6237.webp', '../fotos/r5_bimotor/DSC_6234.webp', '../fotos/r5_bimotor/DSC_6250.webp']
    },
    {
        id: '1VqhChzPFuS4EsTKncIkJu3SFyB2T5bqG',
        name: 'Campello 2023 🚢',
        thumbnail: '../fotos/campello_enero_2023/DSC_3314-min.webp',
        additionalImages: ['../fotos/campello_enero_2023/DSC_3324-min.webp', '../fotos/campello_enero_2023/DSC_3319-min.webp', '../fotos/campello_enero_2023/DSC_3326-min.webp']
    },
    {
        id: '1EeSrLFb-9p1Bi59ej5eW2KK6jBGaVNK7',
        name: 'San Juan 2023 🚢',
        thumbnail: '../fotos/sanjuan2023/DSC_3633.webp',
        additionalImages: ['../fotos/sanjuan2023/DSC_3643.webp', '../fotos/sanjuan2023/DSC_3640.webp', '../fotos/sanjuan2023/DSC_3638.webp', '../fotos/sanjuan2023/DSC_3640.webp']
    },
    {
        id: '1prrH7Yyla5tgAEz6LEJTPGxERwHyhs-8',
        name: 'Moralet 2025 ⛰️',
        thumbnail: '../fotos/moralet_2025/DSC9998.webp',
        additionalImages: ['../fotos/moralet_2025/DSC0031.webp', '../fotos/moralet_2025/DSC0076.webp', '../fotos/moralet_2025/DSC9985.webp']
    },
    {
        id: '18jhjvxDmQPz950v4wpaghI78Zfl3DHUt',
        name: 'Moralet 2024 ⛰️',
        thumbnail: '../fotos/moralet2023/DSC_4809.webp',
        additionalImages: ['../fotos/moralet2023/DSC_4947.webp', '../fotos/moralet2023/DSC_4948.webp', '../fotos/moralet2023/DSC_4950.webp']
    },
   {
        id: '1VjWYrdKy_FZEZcRjfwqprrhEQcYlAwM4',
        name: 'Moralet 2023 ⛰️',
        thumbnail: '../fotos/moralet2023/DSC_4946.webp',
        additionalImages: ['../fotos/moralet2023/DSC_4911.webp', '../fotos/moralet2023/DSC_4928.webp', '../fotos/moralet2023/DSC_4818.webp']
    },
    {
        id: '1mfRnLZcKk7-I45zEFySJTL2lZ24cch1x',
        name: 'Moralet 2022 ⛰️',
        thumbnail: '../fotos/moralet2023/DSC_4863.webp',
        additionalImages: ['../fotos/moralet2023/DSC_4904.webp', '../fotos/moralet2023/DSC_4871.webp', '../fotos/moralet2023/DSC_4651.webp']
    },
    {
        id: '1iuSsfUbP75EQMDuHuDHsz8pZ7kl0eJhA',
        name: 'Agost 2023 ',
        thumbnail: '../fotos/agost_2023/DSC_3505.webp',
        additionalImages: ['../fotos/agost_2023/DSC_3489.webp', '../fotos/agost_2023/DSC_3486.webp', '../fotos/agost_2023/DSC_3481.webp']
    },
    {
        id: '1l4r7ORtNdcgr1y09Mmvgm-vB6EyR_Le0',
        name: 'Volrace 2022 🏎',
        thumbnail: '../fotos/volrace_gt_2022/DSC_3043.webp',
        additionalImages: ['../fotos/volrace_gt_2022/DSC_2787.webp', '../fotos/volrace_gt_2022/DSC_2817.webp', '../fotos/volrace_gt_2022/DSC_2993.webp']
    },
    {
        id: '1R_rfHmNFxYJ0ILO9EQ2WZV8lcttpQBor',
        name: 'Museo Turrón 🍫',
        thumbnail: '../fotos/concentración_turron/DSC_3169.webp',
        additionalImages: ['../fotos/concentración_turron/DSC_3205.webp', '../fotos/concentración_turron/DSC_3207.webp', '../fotos/concentración_turron/DSC_3209.webp']
    },
    {
        id: '16nXnrLSontaTuWYg-cEnGd-NCQjkCeoy',
        name: 'Parole 2023',
        thumbnail: '../fotos/parole_2023/DSC_5917-Editar.webp',
        additionalImages: ['../fotos/parole_2023/DSC_5924-Editar.webp', '../fotos/parole_2023/DSC_5927-Editar.webp', '../fotos/parole_2023/DSC_5930.webp']
    }
];