export interface ColorShade {
  shade: string
  hex: string
}

export interface ColorFamily {
  id: string
  name: string
  subtitle: string
  shades: ColorShade[]
}

export interface BrandColor {
  name: string
  role: string
  hex: string
  textLight?: boolean
  description?: string
}

export const BRAND_COLORS: BrandColor[] = [
  {
    name: 'Primária',
    role: 'Azul',
    hex: '#004185',
    textLight: true,
    description: 'Cor principal dos produtos digitais e identidade',
  },
  {
    name: 'Secundária',
    role: 'Verde',
    hex: '#06D04D',
    textLight: true,
    description: 'Cor de destaque e confirmações',
  },
  {
    name: 'Amarelo (logo)',
    role: 'Amarelo',
    hex: '#F2CB05',
    textLight: false,
    description: 'Uso restrito ao logotipo',
  },
  {
    name: 'Neutro',
    role: 'Cinza Escuro',
    hex: '#141414',
    textLight: true,
    description: 'Fundo sidebar, tipografia e terminais',
  },
  {
    name: 'Alerta',
    role: 'Vermelho',
    hex: '#FF0000',
    textLight: true,
    description: 'Erros, badges de atenção e incorreções',
  },
]

export const COLOR_FAMILIES: ColorFamily[] = [
  {
    id: 'primaria-azul',
    name: 'Primária — Azul',
    subtitle: 'Escala oficial do azul corporativo COMVEN',
    shades: [
      { shade: '50', hex: '#9DC6F3' },
      { shade: '100', hex: '#8BB7E7' },
      { shade: '200', hex: '#689ACE' },
      { shade: '300', hex: '#467CB6' },
      { shade: '400', hex: '#235F9D' },
      { shade: '500', hex: '#004185' },
      { shade: '600', hex: '#00346A' },
      { shade: '700', hex: '#002750' },
      { shade: '800', hex: '#001A35' },
      { shade: '900', hex: '#000D1B' },
    ],
  },
  {
    id: 'secundaria-verde',
    name: 'Secundária — Verde',
    subtitle: 'Escala oficial do verde de suporte e sucesso',
    shades: [
      { shade: '50', hex: '#E6FAED' },
      { shade: '100', hex: '#CDF6DB' },
      { shade: '200', hex: '#9BECB8' },
      { shade: '300', hex: '#6AE394' },
      { shade: '400', hex: '#38D971' },
      { shade: '500', hex: '#06D04D' },
      { shade: '600', hex: '#05A63E' },
      { shade: '700', hex: '#047D2E' },
      { shade: '800', hex: '#02531F' },
      { shade: '900', hex: '#012A0F' },
    ],
  },
  {
    id: 'amarelo-logo',
    name: 'Amarelo — uso restrito ao logotipo',
    subtitle: 'Utilizado estritamente na identidade visual do logotipo',
    shades: [
      { shade: '50', hex: '#FEFAE6' },
      { shade: '100', hex: '#FCF5CD' },
      { shade: '200', hex: '#FAEA9B' },
      { shade: '300', hex: '#F7E069' },
      { shade: '400', hex: '#F5D537' },
      { shade: '500', hex: '#F2CB05' },
      { shade: '600', hex: '#C2A204' },
      { shade: '700', hex: '#917A03' },
      { shade: '800', hex: '#615102' },
      { shade: '900', hex: '#302901' },
    ],
  },
  {
    id: 'alerta-vermelho',
    name: 'Alerta — Vermelho',
    subtitle: 'Escala para estados críticos, erros e badges de restrição',
    shades: [
      { shade: '50', hex: '#FFE5E5' },
      { shade: '100', hex: '#FFCCCC' },
      { shade: '200', hex: '#FF9999' },
      { shade: '300', hex: '#FF6666' },
      { shade: '400', hex: '#FF3333' },
      { shade: '500', hex: '#FF0000' },
      { shade: '600', hex: '#CC0000' },
      { shade: '700', hex: '#990000' },
      { shade: '800', hex: '#660000' },
      { shade: '900', hex: '#330000' },
    ],
  },
  {
    id: 'neutros',
    name: 'Neutros',
    subtitle: 'Superfícies, bordas, contrastes e hierarquia tipográfica',
    shades: [
      { shade: '50', hex: '#EBEBEB' },
      { shade: '100', hex: '#DCDCDC' },
      { shade: '200', hex: '#BFBFBF' },
      { shade: '300', hex: '#A1A1A1' },
      { shade: '400', hex: '#848484' },
      { shade: '500', hex: '#666666' },
      { shade: '600', hex: '#525252' },
      { shade: '700', hex: '#3D3D3D' },
      { shade: '800', hex: '#292929' },
      { shade: '900', hex: '#141414' },
    ],
  },
]
