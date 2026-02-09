import Divider from '../components/Divider';
import EditLabel from '../components/EditLabel';
import LoginButton from '../components/LoginButton';
import Header from '../components/Header';
import PassWordForm from '../components/PassWordForm';
import CheckIcon from '../assets/icons/checkIcon.svg';
import { useState } from 'react';

const PasswordEditPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  // ✅ 이전 비밀번호 에러(틀렸을 때 표시용)
  const [oldPasswordError, setOldPasswordError] = useState(false);

  // ✅ 새 비밀번호 규칙
  const hasLetter = /[a-zA-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasLength = newPassword.length >= 8 && newPassword.length <= 12;

  const isPasswordStarted = newPassword.length > 0;
  const isConfirmStarted = newPasswordConfirm.length > 0;
  const passwordsMatch =
    newPassword === newPasswordConfirm && newPassword.length > 0;

  const handleSubmit = () => {
    // 이전 비밀번호 입력 체크
    if (!oldPassword.trim()) {
      alert('이전 비밀번호를 입력해주세요.');
      return;
    }

    // 새 비밀번호 조건 체크
    if (!(hasLetter && hasNumber && hasLength)) {
      alert('비밀번호 조건을 확인해주세요.');
      return;
    }

    // 새 비밀번호 일치 체크
    if (!passwordsMatch) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    /**
     * ✅ 여기서 API 연결하면 됨
     * 성공이면 oldPasswordError false
     * 실패(이전 비번 틀림 등)이면 oldPasswordError true
     */

    // 일단 예시로: 이전 비번이 틀렸다고 가정하고 에러 띄우기
    setOldPasswordError(true);
  };

  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
      <Header />
      <EditLabel mainLabel="프로필 수정" subLabel="비밀번호 수정" />

      {/* 이전 비밀번호 */}
      <div className="flex w-full flex-col items-center px-[16px] py-[4px]">
        <PassWordForm
          label="비밀번호 수정"
          type="password"
          placeholder="이전 비밀번호"
          value={oldPassword}
          onChange={(v: string) => {
            setOldPassword(v);
            if (oldPasswordError) setOldPasswordError(false); // 다시 입력하면 에러 숨김
          }}
        />

        {oldPasswordError && (
          <div className="mt-[6px] flex w-full items-center gap-[6px] px-[6px] text-[14px] text-[#D75D59]">
            <img src={CheckIcon} alt="" />
            이전 비밀번호가 일치하지 않습니다!
          </div>
        )}
      </div>

      <div className="h-[20px]" />

      {/* 새 비밀번호 */}
      <div className="flex w-full flex-col items-center px-[16px] py-[4px]">
        <PassWordForm
          label=""
          type="password"
          placeholder="비밀번호 입력"
          value={newPassword}
          onChange={setNewPassword}
        />
      </div>

      {/* 규칙 */}
      <div className="flex w-full flex-col items-center justify-center px-[20px] pt-[10px] text-[14px]">
        <div className="flex w-full items-center gap-[10px]">
          <span
            className={`flex items-center gap-[4px] ${
              !isPasswordStarted
                ? 'text-[#BDB7B2]'
                : hasLetter
                  ? 'text-[#7FB77E]'
                  : 'text-[#D75D59]'
            }`}
          >
            <img src={CheckIcon} alt="" />
            영문 포함
          </span>

          <span
            className={`flex items-center gap-[4px] ${
              !isPasswordStarted
                ? 'text-[#BDB7B2]'
                : hasNumber
                  ? 'text-[#7FB77E]'
                  : 'text-[#D75D59]'
            }`}
          >
            <img src={CheckIcon} alt="" />
            숫자 포함
          </span>

          <span
            className={`flex items-center gap-[4px] ${
              !isPasswordStarted
                ? 'text-[#BDB7B2]'
                : hasLength
                  ? 'text-[#7FB77E]'
                  : 'text-[#D75D59]'
            }`}
          >
            <img src={CheckIcon} alt="" />
            8-12자 이내
          </span>
        </div>
      </div>

      {/* 비밀번호 확인 */}
      <div className="flex w-full flex-col items-center px-[16px] pt-[6px] pb-[4px]">
        <PassWordForm
          label=""
          type="password"
          placeholder="비밀번호 확인"
          value={newPasswordConfirm}
          onChange={setNewPasswordConfirm}
        />

        {/* 불일치 문구 바로 출력 */}
        {isConfirmStarted && !passwordsMatch && (
          <div className="mt-[6px] flex w-full items-center gap-[6px] px-[6px] text-[14px] text-[#D75D59]">
            <img src={CheckIcon} alt="" />
            비밀번호가 일치하지 않습니다!
          </div>
        )}

        <div className="flex w-full justify-center py-[10px]">
          <Divider />
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex w-full flex-col items-center justify-center px-[16px] pt-[20px] pb-[20px]">
        <LoginButton
          label="비밀번호 수정하기"
          onClick={handleSubmit}
          disabled={
            !oldPassword ||
            !hasLetter ||
            !hasNumber ||
            !hasLength ||
            !passwordsMatch
          }
          variant={
            oldPassword && hasLetter && hasNumber && hasLength && passwordsMatch
              ? 'brown'
              : 'lightBrown'
          }
        />
      </div>
    </div>
  );
};

export default PasswordEditPage;
