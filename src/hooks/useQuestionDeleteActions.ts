import { useCallback } from 'react';

type UiKey = string; // 'my-123' | 'ai-456'

export function useQuestionDeleteActions(args: {
  selectedKeys: UiKey[];
  openModal: (title: string, onConfirm: () => void) => void;

  // api
  batchDeleteMyQuestions: (payload: { idList: number[] }) => Promise<any>;
  deleteQuestion: (questionId: number) => Promise<any>;
  deleteReadingQuestion: (readingQuestionId: number) => Promise<any>;

  // refresh
  reloadMy: () => Promise<void>;
  reloadAi: () => Promise<void>;

  clearSelection: () => void;
  exitSelectionMode: () => void;
  removeKeyFromSelection?: (key: UiKey) => void;
}) {
  const {
    selectedKeys,
    openModal,
    batchDeleteMyQuestions,
    deleteQuestion,
    deleteReadingQuestion,
    reloadMy,
    reloadAi,
    clearSelection,
    exitSelectionMode,
    removeKeyFromSelection,
  } = args;

  const parseMyIds = useCallback((keys: UiKey[]) => {
    return keys
      .filter((k) => k.startsWith('my-'))
      .map((k) => Number(k.slice(3)))
      .filter((n) => Number.isFinite(n));
  }, []);

  const parseAiIds = useCallback((keys: UiKey[]) => {
    return keys
      .filter((k) => k.startsWith('ai-'))
      .map((k) => Number(k.slice(3)))
      .filter((n) => Number.isFinite(n));
  }, []);

  // 선택 삭제
  const requestDeleteSelected = useCallback(() => {
    if (selectedKeys.length === 0) return;

    const myIds = parseMyIds(selectedKeys);
    const aiIds = parseAiIds(selectedKeys);

    openModal(`선택한 ${selectedKeys.length}개를 삭제할까요?`, () => {
      void (async () => {
        try {
          if (myIds.length > 0) await batchDeleteMyQuestions({ idList: myIds });
          if (aiIds.length > 0) {
            await Promise.all(aiIds.map((id) => deleteReadingQuestion(id)));
          }

          await Promise.all([reloadMy(), reloadAi()]);
          clearSelection();
          exitSelectionMode();
        } catch (e) {
          console.error(e);
        }
      })();
    });
  }, [
    selectedKeys,
    parseMyIds,
    parseAiIds,
    openModal,
    batchDeleteMyQuestions,
    deleteReadingQuestion,
    reloadMy,
    reloadAi,
    clearSelection,
    exitSelectionMode,
  ]);

  // 단건 삭제: 내 질문
  const requestDeleteMyOne = useCallback(
    (questionId: number) => {
      openModal('이 질문을 삭제할까요?', () => {
        void (async () => {
          try {
            await deleteQuestion(questionId);
            await reloadMy();
            removeKeyFromSelection?.(`my-${questionId}`);
          } catch (e) {
            console.error(e);
          }
        })();
      });
    },
    [openModal, deleteQuestion, reloadMy, removeKeyFromSelection],
  );

  // 단건 삭제: AI 질문
  const requestDeleteAiOne = useCallback(
    (readingQuestionId: number) => {
      openModal('이 질문을 삭제할까요?', () => {
        void (async () => {
          try {
            await deleteReadingQuestion(readingQuestionId);
            await reloadAi();
            removeKeyFromSelection?.(`ai-${readingQuestionId}`);
          } catch (e) {
            console.error(e);
          }
        })();
      });
    },
    [openModal, deleteReadingQuestion, reloadAi, removeKeyFromSelection],
  );

  return {
    requestDeleteSelected,
    requestDeleteMyOne,
    requestDeleteAiOne,
  };
}
