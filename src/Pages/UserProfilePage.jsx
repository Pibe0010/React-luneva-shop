import { UserProfile } from "../Components/PagesComponents/Profile/UserProfile.jsx";
import { useUser } from "../Context/AutContext.jsx";
import { MainLayout } from "../Layout/MainLayout.jsx";

export const UserProfilePage = () => {
  const token = useUser();
  return (
    <MainLayout>
      <UserProfile token={token} />
    </MainLayout>
  );
};
