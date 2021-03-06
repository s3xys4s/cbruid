import { v4 as uuid } from 'uuid';

/**
* Генерирует уникальный идентификатор, соответствующий ГОСТ ISO/IEC 15459-6-2016 и добавляет контрольный символ,
* описанный в Указании Банка России от 09.09.2019 № 5251-У «
**/
export function cbruid() {
  const id = uuid();
  const noDashId = id.replaceAll('-', '');

  const noDashIdArray = noDashId.split('');
  let sum = 0;

  for (let i = 0; i < noDashIdArray.length; i++) {
    let orderIndex = (i + 1) % 10;
    if (orderIndex === 0)
      orderIndex = 10;

    let digit = noDashIdArray[i];
    switch (digit) {
      case 'a': {
        digit = 10;
        break;
      };
      case 'b': {
        digit = 11;
        break;
      };
      case 'c': {
        digit = 12;
        break;
      };
      case 'd': {
        digit = 13;
        break;
      };
      case 'e': {
        digit = 14;
        break;
      };
      case 'f': {
        digit = 15;
        break;
      }
    }
    sum += digit * orderIndex;
  };

  const remainder = sum % 16;

  let ctrlChar = remainder.toString();
  switch (ctrlChar) {
    case '10': {
      ctrlChar = 'a';
      break;
    };
    case '11': {
      ctrlChar = 'b';
      break;
    };
    case '12': {
      ctrlChar = 'c';
      break;
    };
    case '13': {
      ctrlChar = 'd';
      break;
    };
    case '14': {
      ctrlChar = 'e';
      break;
    };
    case '15': {
      ctrlChar = 'f';
      break;
    }
  };

  return id + '-' + ctrlChar;
}