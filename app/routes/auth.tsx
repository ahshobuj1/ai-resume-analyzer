import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {usePuterStore} from '~/lib/puter';

export const meta = () => [
  {title: 'CareerScan | Auth'},
  {
    name: 'description',
    content:
      'CareerScan | AI Resume Analyzer & Scanner for Better Job Opportunities!',
  },
];

const auth = () => {
  const {isLoading, auth} = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();
  const next = location.search.split('next=')[1];

  // console.log(location);

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);

  return (
    <section className="bg-[url('images/bg-auth.svg')] bg-cover min-h-screen flex justify-center items-center">
      <div className="gradient-border shadow-lg space-y-5">
        <div className="text-center flex flex-col gap-2">
          <h1>Welcome</h1>
          <h2>Log In to Continue Your Job Journey</h2>
        </div>
        <div className="flex flex-col gap-8 rounded-2xl p-10  bg-white items-center text-center">
          {/* Login button */}
          {isLoading ? (
            <button className="auth-button animate-pulse">
              Singing you in...
            </button>
          ) : (
            <>
              {auth.isAuthenticated ? (
                <button className="auth-button" onClick={auth.signOut}>
                  Log Out
                </button>
              ) : (
                <button className="auth-button" onClick={auth.signIn}>
                  Log In
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default auth;
