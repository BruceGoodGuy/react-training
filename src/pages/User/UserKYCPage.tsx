import KycForm from "./KycForm.tsx";
import { useParams } from "react-router-dom";

const UserKYCPage = () => {
  // Get the id parameter from the URL
  const { id } = useParams<{ id: string }>();
  return <KycForm userId={id} />;
};

export default UserKYCPage;
