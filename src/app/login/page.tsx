import { handleLogin } from "@/actions/handleLogin";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  return <LoginForm onSubmit={handleLogin} />;
}
