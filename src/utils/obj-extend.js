/*
 * @Author: 吴占超
 * @Date: 2019-08-16 15:08:24
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-08-26 11:45:44
 */
const deleteData = (data) => {
  data && Object.keys(data).forEach(p => {
    !data[p] && delete data[p];
  });
  return data;
};

module.exports = { deleteData };
