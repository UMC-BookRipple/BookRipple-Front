import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import arrowIcon from '../../assets/icons/arrowIcon.svg';
import { http } from '../../types/http';


type NotificationItem = {
  notificationId: number,
  content: string,
  url: string,
  isRead: boolean,
  notificationType: string,
  createdAt: string
}

type NotificationResult = {
  notificationList: NotificationItem[];
  lastId: number | null;
  hasNext: boolean;
};

export default function NotificationPage() {
  const navigate = useNavigate();

  const [notis, setNotis] = useState<NotificationItem[]>([]);
  const [lastId, setLastId] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [readAllLoading, setReadAllLoading] = useState(false);

  const accessToken = localStorage.getItem('accessToken');

  const getNotification = async (cursorLastId?: number | null) => {
    if (loading) return;

    try {
      setLoading(true);

      const response = await http.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/notifications`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params:
            cursorLastId !== null && cursorLastId !== undefined
              ? { lastId: cursorLastId }
              : undefined,
        },
      );

      const { isSuccess, code, message, result } = response.data as {
        isSuccess: boolean;
        code: string;
        message: string;
        result: NotificationResult;
      };

      if (!isSuccess) {
        console.log(`코드:${code}, 메시지:${message}`);
        return;
      }

      setNotis((prev) =>
        cursorLastId !== null && cursorLastId !== undefined
          ? [...prev, ...result.notificationList]
          : result.notificationList,
      );
      setLastId(result.lastId);
      setHasNext(result.hasNext);

    } catch (error) {
      console.error('알림 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotification(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRead = async (id: number, url: string) => {
    try {
      const response = await http.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/notifications/${id}/read`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const { isSuccess, code, message } = response.data as {
        isSuccess: boolean;
        code: string;
        message: string;
      };

      if (!isSuccess) {
        console.log(`코드:${code}, 메시지:${message}`);
        return;
      }

      setNotis((prev) =>
        prev.map((noti) => (noti.notificationId === id ? { ...noti, isRead: true } : noti)),
      );
      navigate(url);
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error);
    }
  };

  const handleReadAll = async () => {
    if (readAllLoading) return;

    try {
      setReadAllLoading(true);

      const response = await http.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/notifications/read-all`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const { isSuccess, code, message } = response.data as {
        isSuccess: boolean;
        code: string;
        message: string;
      };

      if (!isSuccess) {
        console.log(`코드:${code}, 메시지:${message}`);
        return;
      }

      setNotis((prev) => prev.map((noti) => ({ ...noti, isRead: true })));

      ;
    } catch (error) {
      console.error('전체 읽음 처리 실패:', error);
    } finally {
      setReadAllLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-[#F7F5F1] font-[Freesentation] text-[#58534E]">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-[#F7F5F1]">
        <Header />

        <header className="flex items-center gap-[16px] self-stretch px-[20px] pt-[20px] pb-[4px]">
          <button
            className="flex items-center justify-center"
          >
            <img
              src={arrowIcon}
              alt="Back"
              className="h-[18px] w-[9px] translate-y-[1px]"
              onClick={() => navigate(-1)}
            />
          </button>

          <div className="w-full flex flex-row gap-[16px] items-center justify-between">
            <h1 className="pt-[2px] text-[18px] font-medium text-[#58534E]"
              onClick={() => navigate(-1)}>
              알림
            </h1>

            <span
              onClick={handleReadAll}
              className={`cursor-pointer ${readAllLoading ? 'opacity-50 pointer-events-none' : ''
                }`}
            >
              {readAllLoading ? '처리 중...' : '전체 읽음'}
            </span>
          </div>
        </header>

        <div
          style={{
            width: '370px',
            height: '0.7px',
            opacity: 0.7,
            background: 'var(--black, #58534E)',
            margin: '15px auto',
          }}
        />

        <div className="flex flex-col gap-[10px] px-[20px] pb-[20px]">
          {notis.map((noti) => (
            <div
              key={noti.notificationId}
              className={`flex flex-col gap-[8px] rounded-[10px] p-[16px] ${noti.isRead ? 'bg-white' : 'bg-[#BDB7B2]/80'
                }`}
              onClick={() => handleRead(noti.notificationId, noti.url)}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[14px] ${noti.isRead ? 'text-[#A6A29C]' : 'text-white'
                    }`}
                >
                  {noti.notificationType}
                </span>
                <span
                  className={`text-[14px] ${noti.isRead ? 'text-[#A6A29C]' : 'text-white'
                    }`}
                >
                  {noti.createdAt}
                </span>
              </div>
              <p className="text-[16px] font-normal leading-normal text-[#58534E]">
                {noti.content}
              </p>
            </div>
          ))}

          {hasNext && (
            <button
              onClick={() => getNotification(lastId)}
              disabled={loading}
              className="mt-[8px] h-[40px] w-full rounded-[10px] bg-[#827A74] text-white disabled:opacity-50"
            >
              {loading ? '불러오는 중...' : '더 보기'}
            </button>
          )}

          {!loading && notis.length === 0 && (
            <div className="py-[24px] text-center text-[#A6A29C]">
              알림이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
