import { Navigate } from "react-router-dom";

export default function Root() {
  return <Navigate to="/login" replace={true} />;
}
