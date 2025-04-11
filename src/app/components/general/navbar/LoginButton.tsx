import Link from "next/link";

interface LoginButton {
  loggedIn: boolean;
  isLoading: boolean;
  handleLogout: () => void;
}

export default function LoginButton({loggedIn, isLoading, handleLogout }: LoginButton) {
  
  if (isLoading) {
    return (
      <div className="bg-slate-800 rounded-full px-4 py-2 xl:ml-8 animate-pulse">
        ...
      </div>
    );
  }

  return (
    <>
      {loggedIn ? (
        <button
          className="bg-slate-800 rounded-full px-4 py-2 hover:bg-slate-900 xl:ml-8"
          onClick={handleLogout}
        >
          Log out
        </button>
      ) : (
        <Link
          href="/login"
          className="bg-slate-800 rounded-full px-4 py-2 hover:bg-slate-900 xl:ml-8"
        >
          Log in
        </Link>
      )}
    </>
  );
}