const RegexEmailPattern = RegExp('^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
const RegexUsernamePattern = new RegExp("^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$")

const isValidUsername = (text: string): boolean => {
    return RegexUsernamePattern.test(text)
};

const isValidEmail = (text: string): boolean => {
    return RegexEmailPattern.test(text);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { isValidEmail, isValidUsername }