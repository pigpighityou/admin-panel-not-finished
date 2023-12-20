class LocalStore {

  setItem(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  removeItem(key) {
    localStorage.removeItem(key);
  }
}

const LocalStoreSetter = new LocalStore().setItem;
const LocalStoreGetter = new LocalStore().getItem;
const LocalStoreRemove = new LocalStore().removeItem;

export default{
    LocalStoreSetter,
    LocalStoreGetter,
    LocalStoreRemove
}


