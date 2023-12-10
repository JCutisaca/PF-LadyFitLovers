const mailRecoverPassword = require("../../config/mailRecoverPassword");
const { User } = require("../../db")
const bcrypt = require("bcryptjs");

const passwordRecovery = async ({ email, code }) => {
    
    const isEmail = (input) => {
        const regexEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
        return regexEmail.test(input);
    }

    if (code && Number(code) && isEmail(email)) {
        const findUser = await User.findOne({ where: {email} })
        if (!findUser) throw new Error("User not found")

        dbCode = findUser.dataValues.recoveryCode
        parsedCode = dbCode.toString()

        const validateCode = await bcrypt.compare(code, parsedCode)
        if (!validateCode) throw new Error("El codigo no coincide/no existe")

    } else if (!code && isEmail(email)) {
        const recoveryCode = Math.floor(100000 + Math.random() * 900000)
        const recoveryString = recoveryCode.toString()
        const hashedCode = await bcrypt.hash(recoveryString, 12)
        
        const findUser = await User.findOne({ where: {email} })
        if (!findUser) throw Error("User not found")
        const update = await User.update({
            recoveryCode: hashedCode,
            recoveryTimer: Date()
        },
            {where: { email }}
        )
        mailRecoverPassword(email, recoveryCode)
    }
    
}


module.exports = { 
    passwordRecovery
}