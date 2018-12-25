import constants from "./constants";

const { GET_USER_DATA_REQUEST } = constants;

const requestUserInfo = () => ({
  type: GET_USER_DATA_REQUEST
});

export default { requestUserInfo };
