const bindLogoutButton = () => {
  const btnLogout = document.querySelector("#btn_logout");
  btnLogout.addEventListener("click", logout);
};

const getToken = () => {
  return localStorage.getItem("token");
};

const getUserByToken = async (token) => {
  try {
    const res = await axios.get('https://api.marktube.tv/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.log("getUserByToken error", error);
    return null;
  }
};

const getBooks = (token) => {
  try {
    const res = await axios.get('https://api.marktube.tv/v1/book', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data;
  } catch (error) {
    console.log('getBooks error', error);
    return null;
  }
}

async function main() {
  // 로그아웃 버튼에 이벤트 바인딩.
  bindLogoutButton();
  // 토큰 체크.
  const token = getToken();
  // 토큰을 가지고 서버에서 유저 정보 가져오기.
  const user = await getUserByToken(token);
  // 토큰 못가져왔을 때.
  if (token === null) {
    localStorage.clear();
    location.assign("/login");
    return;
  }
  // 나의 책 리스트를 서버에서 가져오기.
  const books = await getBooks(token);
  if (books === null) {
    return;
  }
}

document.addEventListener("DOMContentLoaded", main);
