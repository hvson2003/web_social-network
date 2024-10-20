import { EmailOutlined, FacebookTwoTone, Instagram, Language, LinkedIn, MoreVert, Pinterest, Place, Twitter } from '@mui/icons-material'
import './profile.scss'
import Posts from "../../components/posts/Posts";
import { makeRequest } from '../../utils/axios';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const userId = Number(useLocation().pathname.split("/")[2])

  const { isLoading, error, data } = useQuery({
    queryKey: ['user'],
    queryFn: () => makeRequest.get("/user/find/" + userId).then(res => res.data)
  });

  const { isLoading: reIsLoading, data: relationshipData } = useQuery({
    queryKey: ['relationship'],
    queryFn: () => makeRequest.get("/relationship?followedUserId=" + userId).then(res => res.data)
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following) return makeRequest.delete("/relationship?userId=" + userId);
      return makeRequest.post("/relationship", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    const following = relationshipData && relationshipData.includes(currentUser.id);
    mutation.mutate(following);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div className="profile">
      <div className="images">
        <img src={data.coverPic} alt="" className="cover" />
        <img src={data.profilePic} alt="" className="profilePic" />
      </div>

      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoTone fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <Instagram fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <Twitter fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedIn fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <Pinterest fontSize="large" />
            </a>
          </div>

          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <Place />
                <span>{data.city}</span>
              </div>

              <div className="item">
                <Language />
                <span>{data.website}</span>
              </div>
            </div>
            {reIsLoading
              ? "loading"
              : userId === currentUser.id ? (
                <button>update</button>
              ) : (
                <button onClick={handleFollow}>
                  {relationshipData.includes(currentUser.id)
                    ? "Following"
                    : "Follow"
                  }
                </button>
              )}
          </div>

          <div className="right">
            <EmailOutlined />
            <MoreVert />
          </div>
        </div>
        <Posts userId={ userId } />
      </div>
    </div>
  )
}

export default Profile;