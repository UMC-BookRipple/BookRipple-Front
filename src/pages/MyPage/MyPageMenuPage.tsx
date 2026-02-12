import Divider from '../../components/Divider';
import MenuBarItems from '../../components/MenuBarItems';
import Header from '../../components/Header';
import { http } from '../../types/http';
import { useNavigate } from 'react-router-dom';
import arrowIcon from '../../assets/icons/arrowIcon.svg';
import { useModalStore } from '../../stores/ModalStore';
import Modal from '../../components/Modal';

const MyPageMenuPage = () => {
  const navigate = useNavigate();

  const K_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY as string;
  const K_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI as string;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleLogout = async () => {
    try {
      const response = await http.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/logout`,
        { refreshToken: localStorage.getItem('refreshToken') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      );
      const { isSuccess, code, message, result } = response.data;

      if (isSuccess) {
        console.log('로그아웃 성공', result);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/auth/login/local');
      } else {
        console.log(`코드:${code}, 메시지:${message}`);
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const { open: openModal } = useModalStore();

  const confirmAction = () => {
    console.log('confirmAction');
    openModal('회원 탈퇴를 진행하시겠습니까?', handleDelete);
  };

  const handleDelete = async () => {
    try {
      const response = await http.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/members/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
          },
        },
      );

      const { isSuccess, code, message, result } = response.data;

      if (isSuccess) {
        console.log('회원탈퇴 성공', result);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('memberId');
        navigate('/auth/login/local');
      } else {
        console.log(`코드:${code}, 메시지:${message}`);
      }
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
    }
  };
  return (
    <div className="font-weight-[500] flex min-h-dvh w-full flex-col items-center bg-[#F7F5F1] font-[Freesentation] text-[#58534E]">
      <Header />

      {/* MyPageLabel */}
      <div className="flex w-full flex-row items-center justify-between px-[14px] pt-[30px]">
        <span className="flex h-[50px] items-center gap-[10px] px-[5px] py-[12px] font-[GmarketSansBold] text-[20px] whitespace-nowrap text-[#58534E]">
          <img src={arrowIcon} alt="" />
          MY PAGE
        </span>
        <button
          onClick={handleLogout}
          className="flex h-[28px] w-[58px] items-center justify-center gap-[10px] rounded-[30px] bg-[#827A74] px-[8px] py-[6px] text-[14px] text-[#FFFFFF]"
        >
          로그아웃
        </button>
      </div>

      <div className="flex w-full flex-col px-[14px] py-[6px]">
        <Divider />
        <div className="w-full">
          <MenuBarItems
            mainLabel="프로필"
            MenuBarLabel=""
            plusMenuLabel="수정"
            onClickPlus={() => navigate('/profile/edit/menu')}
          />
        </div>
        <Divider />
      </div>

      <div className="flex w-full flex-col items-start gap-[6px] px-[14px] py-[10px]">
        <div className="px-[4px]">
          <span className="rounded-[20px] bg-[#E6E6E6] px-[8px] py-[4px]">
            {localStorage.getItem('userName')}
          </span>
        </div>
        <span className="px-[10px]" onClick={handleKakaoLogin}>
          카카오로 로그인
        </span>
      </div>
      <Modal label="진행하기" />
      <div className="flex w-full flex-col px-[14px] py-[6px]">
        <Divider />
        <MenuBarItems mainLabel="내 도서 기록" MenuBarLabel="" />
        <Divider />
      </div>

      <div className="font-weight-[500] flex w-full flex-col items-start gap-[6px] px-[24px] py-[10px] text-[16px] text-[#58534E]">
        <span onClick={() => navigate('/members/me/records')}>
          내 도서 기록 확인하기
        </span>
      </div>

      <div className="flex w-full flex-col px-[14px] py-[6px]">
        <Divider />
        <MenuBarItems mainLabel="내 기록 확인" MenuBarLabel="" />
        <Divider />
      </div>

      <div className="font-weight-[500] flex w-full flex-col items-start gap-[16px] px-[24px] py-[10px] text-[16px] text-[#58534E]">
        <span onClick={() => navigate('/reviews/me')}>작성한 감상평 확인</span>
        <span onClick={() => navigate('/memos/me')}>메모 전체 기록 관리</span>
        <span onClick={() => navigate('/questions/me')}>
          질문 전체 기록 관리
        </span>
        <span onClick={() => navigate('/answer/me')}>답변 전체 기록 관리</span>
        <span onClick={() => navigate('/mypage/recommend')}>
          추천 도서 기록 관리
        </span>
      </div>

      <div className="flex w-full flex-col items-center justify-center px-[10px] py-[4px] pb-[20px]">
        <Divider />
        <div className="h-[189px]" />
        <div className="flex w-full flex-col items-center gap-[8px]">
          <span onClick={() => navigate('/policy')}>약관 및 정보</span>
          <span onClick={confirmAction}>회원 탈퇴</span>
        </div>
      </div>
    </div>
  );
};

export default MyPageMenuPage;
