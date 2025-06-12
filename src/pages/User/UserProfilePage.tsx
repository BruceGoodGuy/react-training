import ProfileForm from './ProfileForm.tsx';
import { useParams } from 'react-router-dom';

const UserProfilePage = () => {
    // Get the id parameter from the URL
    const { id } = useParams<{ id: string }>();
    return (<ProfileForm userId={id}></ProfileForm>)
}

export default UserProfilePage
