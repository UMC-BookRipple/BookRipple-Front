import BlindBookShell from '../../_components/BlindBookShell';
import blindBookIcon from '../../../../assets/icons/blindBook-2.svg';

export default function BuyCompletePage() {
    return (
        <BlindBookShell
            activeMode="buy"
            showHero={false}
            noBottomPadding={true}
            hideTabs={true}
        >
            <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-120px)] px-5">
                <div
                    style={{
                        display: 'flex',
                        width: '362px',
                        height: '570px',
                        flexDirection: 'column',
                        borderRadius: '20px',
                        background: 'linear-gradient(180deg, rgba(255, 243, 208, 0.00) 0%, rgba(255, 243, 208, 0.20) 100%), #FFF',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                        overflow: 'hidden'
                    }}
                >
                    {/* 상단: 타이틀 (이미지 정중앙 유지를 위해 하단과 대칭인 193.5px 확보) */}
                    <div
                        style={{
                            display: 'flex',
                            height: '193.5px',
                            padding: '0 14px 50px 14px',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            gap: '10px',
                            flexShrink: 0,
                        }}
                    >
                        <h2
                            style={{
                                color: '#827A74',
                                fontFamily: 'Gmarket Sans TTF',
                                fontSize: '20px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: 'normal',
                            }}
                        >
                            BLIND BOOK
                        </h2>
                    </div>

                    {/* 중앙: 이미지 (상하 193.5px 대칭 영역으로 인해 카드 정중앙에 자동 고정) */}
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <img
                            src={blindBookIcon}
                            alt="Complete"
                            style={{ width: '186px', height: '183px' }}
                            className="object-contain opacity-80"
                        />
                    </div>

                    {/* 하단: 완료 문구 (이미지 하단과의 거리를 정확히 20px로 유지) */}
                    <div
                        style={{
                            display: 'flex',
                            height: '193.5px',
                            padding: '20px 20px 0 20px',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            gap: '10px',
                        }}
                    >
                        <p
                            style={{
                                color: '#827A74',
                                textAlign: 'center',
                                fontFamily: 'Freesentation',
                                fontSize: '22px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                            }}
                        >
                            결제가 완료되었습니다
                        </p>
                    </div>
                </div>
            </div>
        </BlindBookShell>
    );
}
