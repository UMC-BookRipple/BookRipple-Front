import { http } from './http';

export type GlobalResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export type MemoItem = {
  memoId: number;
  writerName: string;
  bookId: number;
  bookTitle: string;
  memoTitle: string;
  context: string;
  page: string;
};

export type MemoListResult = {
  items: MemoItem[];
  lastId: number;
  hasNext: boolean;
};

export type MemoDetailResult = {
  memoId: number;
  writerName: string;
  memoTitle: string;
  context: string;
  page: string;
};

export type MemoUpsertReq = {
  contentReq: {
    content: string;
  };
  memoTitle: string;
  page: string;
};

// POST 메모 생성
export async function createMemo(bookId: number, body: MemoUpsertReq) {
  const { data } = await http.post<GlobalResponse<{ id: number }>>(
    `/api/v1/books/${bookId}/memos`,
    body,
  );
  return data;
}

// GET 책별 메모 목록 조회
export async function fetchMemoList(
  bookId: number,
  lastId?: number,
  size?: number,
) {
  const params: Record<string, number> = {};
  if (lastId !== undefined) params.lastId = lastId;
  if (size !== undefined) params.size = size;

  const { data } = await http.get<GlobalResponse<MemoListResult>>(
    `/api/v1/books/${bookId}/memos`,
    { params },
  );
  return data;
}

// GET 내가 쓴 책별 메모 목록 조회 (추가)
export async function fetchMyBookMemoList(
  bookId: number,
  lastId?: number,
  size?: number,
) {
  const params: Record<string, number> = {};
  if (lastId !== undefined) params.lastId = lastId;
  if (size !== undefined) params.size = size;

  const { data } = await http.get<GlobalResponse<MemoListResult>>(
    `/api/v1/books/${bookId}/memos/me`,
    { params },
  );
  return data;
}

// GET 내 메모 목록 조회 (추가)
export async function fetchMyMemoList(lastMemoId?: number, size?: number) {
  const params: Record<string, number> = {};
  if (lastMemoId !== undefined) params.lastMemoId = lastMemoId;
  if (size !== undefined) params.size = size;

  const { data } = await http.get<GlobalResponse<MemoListResult>>(
    `/api/v1/memos/me`,
    { params },
  );
  return data;
}

// GET 메모 상세 조회
export async function fetchMemoDetail(memoId: number) {
  const { data } = await http.get<GlobalResponse<MemoDetailResult>>(
    `/api/v1/memos/${memoId}`,
  );
  return data;
}

// PATCH 메모 수정
export async function updateMemo(memoId: number, body: MemoUpsertReq) {
  const { data } = await http.patch<GlobalResponse<{ id: number }>>(
    `/api/v1/memos/${memoId}`,
    body,
  );
  return data;
}

// DELETE 메모 삭제
export async function deleteMemo(memoId: number) {
  const { data } = await http.delete<GlobalResponse<{ id: number }>>(
    `/api/v1/memos/${memoId}`,
  );
  return data;
}
