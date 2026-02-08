import React, { useState } from "react";
import Header from "../../components/Header";
import logoImg from "/src/assets/icons/logo.svg";
import SearchBarSimple from "../../components/SearchBar_simple"; // SearchBarSimple 사용
import BookCard from "../../components/Card/BookCard";
import { dummyBooks } from "../../data/dummyBooks";
import { Link } from "react-router-dom";
import CommunitySearchTab from "../../components/Community/CommunitySearchTab"; // CommunitySearchTab import

const CommunityPage = () => {
    const [view, setView] = useState<"list" | "search">("list"); // 뷰 상태 관리
    const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어 상태

    // 검색창을 클릭하면 CommunitySearchTab으로 변경
    const handleSearchClick = () => {
        setView("search");
    };

    // 뒤로가기 버튼 클릭 시
    const handleBack = () => {
        setView("list");
    };

    if (view === "search") {
        return (
            <CommunitySearchTab
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onBack={handleBack}
            />
        );
    }

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#F7F5F1]">
            {/* Header */}
            <Header />

            {/* 로고 영역 */}
            <div className="flex flex-col justify-center items-center gap-[10px] self-stretch px-[10px] pt-[26px] pb-[16px]">
                <img
                    src={logoImg}
                    alt="Community Logo"
                    className="w-[160px] h-auto object-contain"
                />
            </div>

            {/* COMMUNITY 텍스트 영역 */}
            <div className="flex justify-center items-center w-full px-[14px] py-[10px] text-[#58534E] font-[GmarketSans] text-[20px] font-bold">
                COMMUNITY
            </div>

            {/* 검색창 (클릭하면 검색 탭으로 이동) */}
            <div className="w-full px-[16px] py-[10px]">
                <SearchBarSimple
                    placeholder="도서 검색하기"
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} // 검색어 상태 변경
                    onClick={handleSearchClick} // 검색창 클릭 시 검색 탭으로 이동
                />
            </div>

            {/* 오늘의 추천도서 영역 */}
            <div className="flex flex-col justify-center items-center w-full px-[16px] py-[10px] gap-[5px]">
                {/* 제목 */}
                <div className="flex items-center w-full px-[5px] gap-[60px]">
                    <p
                        className="text-[#58534E] text-[16px] font-[400] text-center"
                        style={{ fontFamily: "Freesentation" }}
                    >
                        오늘의 추천도서
                    </p>
                </div>

                {/* 검은 라인 */}
                <div className="w-full h-[1px] bg-black my-[5px]" />

                {/* 카드 리스트 - 검은 선 안쪽 + 가운데 정렬 */}
                <div className="w-full">
                    <div className="flex justify-between flex-wrap gap-2 sm:gap-4 md:gap-6 lg:gap-8 py-[10px]">
                        {dummyBooks.map((book) => (
                            <Link
                                key={book.id}
                                to={`/community/book/${book.id}`}
                                state={{ book }}
                                className="block"
                            >
                                <BookCard
                                    title={book.title}
                                    imgSrc={book.imageUrl}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* 나의 도서 영역 */}
            <div className="flex flex-col justify-center items-center w-full px-[16px] py-[10px] gap-[5px]">
                {/* 제목 */}
                <div className="flex items-center justify-between w-full px-[5px]">
                    <p
                        className="text-[#58534E] text-[16px] font-[400]"
                        style={{ fontFamily: "Freesentation" }}
                    >
                        나의 도서
                    </p>

                    {/* 오른쪽 화살표 버튼 */}
                    <button className="p-1 flex-shrink-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 8 15"
                            fill="none"
                            className="rotate-360"
                        >
                            <path
                                d="M0.5 14.5L7.5 7.5L0.5 0.5"
                                stroke="#58534E"
                                strokeWidth={1}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* 검은 라인 */}
                <div className="w-full h-[1px] bg-black mb-2" />

                {/* 카드 리스트 - 검은 선 안쪽 + 최대 간격 */}
                <div className="w-full">
                    <div className="flex justify-between flex-wrap gap-2 sm:gap-4 md:gap-6 lg:gap-8 py-[10px]">
                        {dummyBooks.map((book) => (
                            <BookCard
                                key={book.id}
                                title={book.title}
                                imgSrc={book.imageUrl}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
