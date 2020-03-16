/*
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-16 19:59:46
 * @LastEditTime: 2020-03-16 20:27:33
 */

export function formatFacilityList(list: any): any {
  let cacheList: any = {
    serviceList: [],
    basisList: [],
    showerList: [],
    kitchenList: []
  };

  for (let item in list) {
    let temp: any = {
      value: '',
      isHave: false
    }
    switch (item.split("_")[0]) {
      case "service":
        switch (item.split("_")[1]) {
          case '0':
            temp.value = '自助入住';
            break;
          case '1':
            temp.value = '床品更换';
            break;
          case '2':
            temp.value = '行李寄存';
            break;
          case '3':
            temp.value = '门禁系统';
            break;
          default:
            break;
        }
        temp.isHave = list[item] ? true : false
        cacheList.serviceList.push(
          temp
        );
        break;
      case "basis":
        switch (item.split("_")[1]) {
          case '0':
            temp.value = 'wifi';
            break;
          case '1':
            temp.value = '电梯';
            break;
          case '2':
            temp.value = '空调';
            break;
          case '3':
            temp.value = '热水壶';
            break;
          case '4':
            temp.value = '洗衣机';
            break;
          case '5':
            temp.value = '电吹风';
            break;
          case '6':
            temp.value = '电视';
            break;
          case '7':
            temp.value = '饮水机';
            break;
          case '8':
            temp.value = '电视机';
            break;
          case '9':
            temp.value = '打扫工具';
            break;
          case '10':
            temp.value = '工作区域';
            break;
          case '11':
            temp.value = '电熨斗';
            break;
          default:
            break;
        }
        temp.isHave = list[item] ? true : false
        cacheList.basisList.push(
          temp
        );
        break;
      case "shower":
        switch (item.split("_")[1]) {
          case '0':
            temp.value = '牙具';
            break;
          case '1':
            temp.value = '沐浴露';
            break;
          case '2':
            temp.value = '拖鞋';
            break;
          case '3':
            temp.value = '洗发水';
            break;
          case '4':
            temp.value = '毛巾';
            break;
          case '5':
            temp.value = '衣架';
            break;
          case '6':
            temp.value = '香皂';
            break;
          case '7':
            temp.value = '热水淋浴';
            break;
          default:
            break;
        }
        temp.isHave = list[item] ? true : false
        cacheList.showerList.push(
          temp
        );
        break;
      case "kitchen":
        switch (item.split("_")[1]) {
          case '0':
            temp.value = '电磁炉';
            break;
          case '1':
            temp.value = '烹饪锅具';
            break;
          case '2':
            temp.value = '调料';
            break;
          case '3':
            temp.value = '餐具';
            break;
          case '4':
            temp.value = '微波炉';
            break;
          case '5':
            temp.value = '冰箱';
            break;
          case '6':
            temp.value = '燃气灶';
            break;
          case '7':
            temp.value = '刀具菜板';
            break;
          default:
            break;
        }
        temp.isHave = list[item] ? true : false
        cacheList.kitchenList.push(
          temp
        );
        break;
      default:
        break;
    }
  }
  return cacheList;
}