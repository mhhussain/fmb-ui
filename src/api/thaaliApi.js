import axios from "axios";

const getJamaatMemberByITSId = async (itsId) => {
  const res = await axios.get(
    `https://test-thaali-api.herokuapp.com/api/db/JamaatMembers?ItsID=${itsId}`
  );
  console.log("result is", res);
  return res;
};

export { getJamaatMemberByITSId };
