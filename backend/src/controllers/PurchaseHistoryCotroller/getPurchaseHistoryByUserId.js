const { PurchaseHistory } = require('../../db')

const getPurchaseHistoryByUserId = async ({ userId }) => {
    if (!userId) throw Error("Please provide a valid ID.")
    const findPurchaseHistoryUser = await PurchaseHistory.findOne({ where: { UserId: userId } })
    if (!findPurchaseHistoryUser) throw Error("Purchase history not found for the user. It appears the user hasn't made any purchases.")
    return findPurchaseHistoryUser;
}

module.exports = getPurchaseHistoryByUserId;