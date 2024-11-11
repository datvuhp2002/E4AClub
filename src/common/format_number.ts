const formatNumber = {
  formatNumber(num: any) {
    if (!num) return null;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
};
export default formatNumber;
