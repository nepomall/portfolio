$(document).ready(function () {

    // 마우스 커서 효과
    document.getElementsByTagName("body")[0].addEventListener("mousemove", function (n) {
        t.style.left = n.clientX + "px",
            t.style.top = n.clientY + "px",
            e.style.left = n.clientX + "px",
            e.style.top = n.clientY + "px",
            i.style.left = n.clientX + "px",
            i.style.top = n.clientY + "px"
    });
    var t = document.getElementById("cursor"),
        e = document.getElementById("cursor2"),
        i = document.getElementById("cursor3");
    function n(t) {
        e.classList.add("hover"), i.classList.add("hover")
    }
    function s(t) {
        e.classList.remove("hover"), i.classList.remove("hover")
    }
    s();
    for (var r = document.querySelectorAll(".hover-target"), a = r.length - 1; a >= 0; a--) {
        o(r[a])
    }
    function o(t) {
        t.addEventListener("mouseover", n), t.addEventListener("mouseout", s)
    }

    function typingJs() {
        // 타이핑 효과---------------------------------------
        const $text = document.querySelector(".main_section h3");

        // 글자 모음 - 개행문자(\n)로 줄바꿈
        const letters = [
            "Welcome to\n Inoo's Portfolio"
        ];

        // 글자 입력 속도
        const speed = 100;
        let i = 0;

        // 줄바꿈을 위한 <br> 치환
        const changeLineBreak = (letter) => {
            return letter.map(text => text === "\n" ? "<br>" : text);
        }

        // 타이핑 효과
        const typing = async () => {
            // 기존코드에서 개행치환코드 추가
            const letter = changeLineBreak(letters[i].split(""));

            while (letter.length) {
                await wait(speed);
                $text.innerHTML += letter.shift();
            }

            // 잠시 대기
            await wait(800);

            // 지우는 효과
            remove();
        }

        // 글자 지우는 효과
        // const remove = async () => {
        //     // 기존코드에서 개행치환코드 추가
        //     const letter = changeLineBreak(letters[i].split(""));

        //     while (letter.length) {
        //         await wait(speed);

        //         letter.pop();
        //         $text.innerHTML = letter.join("");
        //     }

        //     // 다음 순서의 글자로 지정, 타이핑 함수 다시 실행
        //     i = !letters[i + 1] ? 0 : i + 1;
        //     typing();
        // }

        // 딜레이 기능 ( 마이크로초 )
        function wait(ms) {
            return new Promise(res => setTimeout(res, ms))
        }

        // 초기 실행
        setTimeout(typing, 1500);
    }
    typingJs();

    // 버튼 클릭
    const mainBtn = $(".main_section button");
    const leftBtn = $('.main_section .about');
    const rightBtn = $('.main_section .contact');
    const skillBtn = $('.main_section .skill');
    const projectBtn = $('.main_section .project');
    const closeBtn = $('.close_btn');

    mainBtn.click(function () {
        $('.main_section').addClass('active');
    });

    leftBtn.click(function () {
        $('.about_section').addClass('active');
    });

    rightBtn.click(function () {
        $('.contact_section').addClass('active');
    });

    skillBtn.click(function () {
        $('.skill_section').addClass('active');

        setTimeout(function () {
            $('.chart').easyPieChart({
                barColor: "#efa903",
                trackColor: '#1f2029',
                scaleColor: false,
                lineCap: "round",
                lineWidth: 20,
                size: 200,
                animate: 1000,
                onStart: $.noop,
                onStop: $.noop,
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        }, 1200);
    });

    projectBtn.click(function () {
        $('.project_section').addClass('active');
    });

    closeBtn.click(function () {
        $('.sub_section').removeClass('active');

        setTimeout(function () {
            $('.main_section').removeClass('active');
        }, 800);
    });

    // 커버플로우 슬라이드
    const coverFlow = new Swiper('.coverflow .swiper-container', {
        effect: 'coverflow',
        loop: true,
        // autoplay: true,
        loopedSlides: 3,
        centeredSlides: true,
        coverflowEffect: {
            rotate: 0,
            depth: 300,
            slideShadows: false,
            stretch: 100,
        },
    });

    // 페이드플로우 슬라이드
    const fadeFlow = new Swiper('.fadeflow .swiper-container', {
        effect: 'fade',
        loop: true,
        loopedSlides: 3,
        allowTouchMove: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    coverFlow.controller.control = fadeFlow;
    fadeFlow.controller.control = coverFlow;
});