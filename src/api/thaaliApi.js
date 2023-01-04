import axios from "axios";
import { JamaatMember, schema } from '@/api/models/JamaatMember';

const getJamaatMemberByITSId = async (itsId) => {
  const res = await axios.get(
    `https://test-thaali-api.herokuapp.com/api/db/JamaatMembers?ItsID=${itsId}`
  );
  console.dir(res.data[0]);
  return new JamaatMember(await schema.validate(res.data[0]));
  /*const res = await axios.get(
    `https://test-thaali-api.herokuapp.com/api/db/JamaatMembers?ItsID=${itsId}`
  );
  return res;*/
};

export { getJamaatMemberByITSId };
