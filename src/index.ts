import {
  LoginPage,
  SettingsPage,
  RegistrationPage,
  ErrorPage404,
  ErrorPage500,
  ChatPage,
} from "./pages";
import Router from "./modules/Router";

const router = new Router(window);

router.use("/messenger", new ChatPage());
router.use("/sign-up", new RegistrationPage());
router.use("/", new LoginPage());
router.use("", new LoginPage());
router.use("/settings", new SettingsPage());
router.use("/500/", new ErrorPage500());
router.use("/404/", new ErrorPage404());

router.start();
