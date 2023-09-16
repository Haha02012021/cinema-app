import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import {
  createUser,
  editUser,
  getUserByEmail,
} from "../../services/userServices";
import { toast } from "react-toastify";

const LOG_IN = "LOG_IN";
const CHECK_LOGED_IN = "CHECK_LOGED_IN";
const LOG_OUT = "LOG_OUT";
const REGISTER = "REGISTER";
const EDIT_PASSWORD = "EDIT_PASSWORD";

const logInAction = (userAccount) => async (dispatch) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    await signInWithEmailAndPassword(
      auth,
      userAccount.email,
      userAccount.password,
    )
      .then((userCredentail) => userCredentail.user.accessToken)
      .then((accessToken) => {
        localStorage.setItem("accessToken", accessToken);
        dispatch({
          type: LOG_IN,
          success: true,
        });
        toast.success("Đăng nhập thành công!");
      })
      .catch((error) => {
        dispatch({
          type: LOG_IN,
          success: false,
        });

        switch (error.code) {
          case AuthErrorCodes.INVALID_PASSWORD:
            toast.error("Sai mật khẩu!");
            break;
          case AuthErrorCodes.USER_DELETED:
            toast.error("Không tìm thấy email!");
            break;
          default:
            toast.error("Có lỗi xảy ra!");
            break;
        }
      });
  }
};

const checkLogedInAction = () => async (dispatch, getState) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          const userInfo = await getUserByEmail(currentUser.email);
          if (!userInfo[0]) {
            localStorage.removeItem("accessToken");
            toast.error("Tài khoản không tồn tại!");
            currentUser.delete();
          } else {
            dispatch({
              type: CHECK_LOGED_IN,
              userInfo: userInfo[0],
            });
          }
        } catch (error) {
          toast.error("Có lỗi xảy ra!");
        }
      } else {
        localStorage.removeItem("accessToken");
        dispatch({
          type: CHECK_LOGED_IN,
          userInfo: null,
        });
      }
    });
  } else {
    dispatch({
      type: CHECK_LOGED_IN,
      userInfo: null,
    });
  }
};

const logOutAction = () => async (dispatch) => {
  await signOut(auth)
    .then(() => {
      localStorage.removeItem("accessToken");
      dispatch({
        type: LOG_OUT,
      });
      toast.success("Đăng xuất thành công!");
    })
    .catch((error) => {
      toast.error("Có lỗi xảy ra!");
    });
};

const registerAction = (userInfo) => async (dispatch) => {
  await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
    .then(async (userCredentail) => {
      const user = userCredentail.user;
      delete userInfo.password;
      delete userInfo.repassword;
      try {
        await createUser({ ...userInfo, fuid: user.uid });
        dispatch({
          type: REGISTER,
        });
        toast.success("Đăng ký thành công!");
      } catch (error) {
        user.delete();
        toast.error("Có lỗi xảy ra!");
      }
    })
    .catch((error) => {
      toast.error("Có lỗi xảy ra!");
    });
};

const editPassword = (newPassword, newUserInfo) => async (dispatch) => {
  if (!newPassword) {
    const user = await editUser(newUserInfo.id, newUserInfo);
    dispatch({
      type: EDIT_PASSWORD,
      userInfo: user,
    });
  } else {
    auth.onAuthStateChanged(async (currentUser) => {
      updatePassword(currentUser, newPassword)
        .then(async () => {
          const user = await editUser(newUserInfo.id, newUserInfo);
          dispatch({
            type: EDIT_PASSWORD,
            userInfo: user,
          });
        })
        .catch((error) => {
          toast.error("Có lỗi xảy ra!");
        });
    });
  }
};

export {
  LOG_IN,
  CHECK_LOGED_IN,
  REGISTER,
  LOG_OUT,
  EDIT_PASSWORD,
  logInAction,
  checkLogedInAction,
  logOutAction,
  registerAction,
  editPassword,
};
