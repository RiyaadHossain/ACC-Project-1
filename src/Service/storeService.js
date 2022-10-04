const Store = require("../Model/Store");

exports.getStoresService = async () => {
    const stores = await Store.find({});
    return stores;
};

exports.createStoreService = async (data) => {
    const store = await Store.create(data);
    return store;
};

exports.getStoreByIdService = async (storeId) => {
    const store = await Store.findById({ storeId });
    return store;
};