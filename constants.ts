import { Country } from './types';

export const TOTAL_OPTIONS = 3;
export const QUESTIONS_PER_SET = 10;
export const SCORE_PER_QUESTION = 10;

export const COUNTRIES: Country[] = [
  { code: 'CN', name: '中国' }, { code: 'US', name: '美国' }, { code: 'GB', name: '英国' }, { code: 'JP', name: '日本' },
  { code: 'FR', name: '法国' }, { code: 'DE', name: '德国' }, { code: 'RU', name: '俄罗斯' }, { code: 'IT', name: '意大利' },
  { code: 'CA', name: '加拿大' }, { code: 'AU', name: '澳大利亚' }, { code: 'BR', name: '巴西' }, { code: 'IN', name: '印度' },
  { code: 'KR', name: '韩国' }, { code: 'ES', name: '西班牙' }, { code: 'MX', name: '墨西哥' }, { code: 'ID', name: '印度尼西亚' },
  { code: 'TR', name: '土耳其' }, { code: 'SA', name: '沙特阿拉伯' }, { code: 'CH', name: '瑞士' }, { code: 'AR', name: '阿根廷' },
  { code: 'SE', name: '瑞典' }, { code: 'PL', name: '波兰' }, { code: 'BE', name: '比利时' }, { code: 'TH', name: '泰国' },
  { code: 'VN', name: '越南' }, { code: 'EG', name: '埃及' }, { code: 'PT', name: '葡萄牙' }, { code: 'NL', name: '荷兰' },
  { code: 'MY', name: '马来西亚' }, { code: 'PH', name: '菲律宾' }, { code: 'ZA', name: '南非' }, { code: 'GR', name: '希腊' },
  { code: 'DK', name: '丹麦' }, { code: 'FI', name: '芬兰' }, { code: 'NO', name: '挪威' }, { code: 'IE', name: '爱尔兰' },
  { code: 'NZ', name: '新西兰' }, { code: 'SG', name: '新加坡' }, { code: 'IL', name: '以色列' }, { code: 'AT', name: '奥地利' },
  { code: 'CZ', name: '捷克' }, { code: 'HU', name: '匈牙利' }, { code: 'UA', name: '乌克兰' }, { code: 'CL', name: '智利' },
  { code: 'CO', name: '哥伦比亚' }, { code: 'PE', name: '秘鲁' }, { code: 'PK', name: '巴基斯坦' }, { code: 'BD', name: '孟加拉国' },
  { code: 'NG', name: '尼日利亚' }, { code: 'KE', name: '肯尼亚' }, { code: 'MA', name: '摩洛哥' }, { code: 'QA', name: '卡塔尔' },
  { code: 'AE', name: '阿联酋' }, { code: 'IR', name: '伊朗' }, { code: 'IQ', name: '伊拉克' },
  { code: 'DZ', name: '阿尔及利亚' }, { code: 'AO', name: '安哥拉' }, { code: 'AM', name: '亚美尼亚' }, { code: 'AZ', name: '阿塞拜疆' },
  { code: 'BH', name: '巴林' }, { code: 'BY', name: '白俄罗斯' }, { code: 'BO', name: '玻利维亚' }, { code: 'BG', name: '保加利亚' },
  { code: 'KH', name: '柬埔寨' }, { code: 'CM', name: '喀麦隆' }, { code: 'CR', name: '哥斯达黎加' }, { code: 'HR', name: '克罗地亚' },
  { code: 'CU', name: '古巴' }, { code: 'CY', name: '塞浦路斯' }, { code: 'DO', name: '多米尼加' }, { code: 'EC', name: '厄瓜多尔' },
  { code: 'SV', name: '萨尔瓦多' }, { code: 'EE', name: '爱沙尼亚' }, { code: 'ET', name: '埃塞俄比亚' }, { code: 'GE', name: '格鲁吉亚' },
  { code: 'GH', name: '加纳' }, { code: 'GT', name: '危地马拉' }, { code: 'HN', name: '洪都拉斯' }, { code: 'IS', name: '冰岛' },
  { code: 'JM', name: '牙买加' }, { code: 'JO', name: '约旦' }, { code: 'KZ', name: '哈萨克斯坦' }, { code: 'KW', name: '科威特' },
  { code: 'KG', name: '吉尔吉斯斯坦' }, { code: 'LA', name: '老挝' }, { code: 'LV', name: '拉脱维亚' }, { code: 'LB', name: '黎巴嫩' },
  { code: 'LT', name: '立陶宛' }, { code: 'LU', name: '卢森堡' }, { code: 'MG', name: '马达加斯加' }, { code: 'MV', name: '马尔代夫' },
  { code: 'MT', name: '马耳他' }, { code: 'MC', name: '摩纳哥' }, { code: 'MN', name: '蒙古' }, { code: 'ME', name: '黑山' },
  { code: 'MM', name: '缅甸' }, { code: 'NA', name: '纳米比亚' }, { code: 'NP', name: '尼泊尔' }, { code: 'NI', name: '尼加拉瓜' },
  { code: 'KP', name: '朝鲜' }, { code: 'MK', name: '北马其顿' }, { code: 'OM', name: '阿曼' }, { code: 'PA', name: '巴拿马' },
  { code: 'PY', name: '巴拉圭' }, { code: 'RO', name: '罗马尼亚' }, { code: 'SN', name: '塞内加尔' }, { code: 'RS', name: '塞尔维亚' },
  { code: 'SK', name: '斯洛伐克' }, { code: 'SI', name: '斯洛文尼亚' }, { code: 'LK', name: '斯里兰卡' }, { code: 'SD', name: '苏丹' },
  { code: 'SY', name: '叙利亚' }, { code: 'TW', name: '中国台湾' }, { code: 'TZ', name: '坦桑尼亚' }, { code: 'TN', name: '突尼斯' },
  { code: 'UG', name: '乌干达' }, { code: 'UY', name: '乌拉圭' }, { code: 'UZ', name: '乌兹别克斯坦' }, { code: 'VE', name: '委内瑞拉' },
  { code: 'YE', name: '也门' }, { code: 'ZM', name: '赞比亚' }, { code: 'ZW', name: '津巴布韦' }
];
