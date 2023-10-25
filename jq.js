//리팩토링 - 검토해서 좀더 나은 것으로 교체한다.

//변수 초기화
const win = $(window);
const gnb = $('.gnb li');
const sections = $('.section');
//프로젝트변수
const projects = $('.projects');
const sideNav = $('.sideNav >li');
const speed = Math.floor($(window).height() * 0.9);
let winSCT;
let topArr = [];
//gnb
gnb.on({
	/*     mouseover: function (e) { //마우스가 요소 위에 올라왔을때 할 일
            e.preventDefault();
            $(this).addClass('on'); //어떤 것에 올라갈지 모르기 때문에 this를 쓴다.

        },
        mouseout: function (e) {
            e.preventDefault();
            $(this).removeClass('on');
        }, */
	click: function () {
		let tg = $(this);
		let index = tg.index();
		let section = sections.eq(index); //요소를 선택한다.
		let offset = section.offset().top; //속성을 가져온다.
		$('html, body').stop().animate({ scrollTop: offset }, 1000, 'easeOutCirc');
	},
});

//이벤트 스크롤 상단메뉴 스티키
win.on('scroll', function () {
	let sct = win.scrollTop();

	//li들의 서로 다른 값을 얻으러면 이치문을 써야 함.
	sections.each(function (i) {
		// console.log(sections.eq(i).offset().top);
		if (sct >= sections.eq(i).offset().top - 300) {
			gnb.eq(i).addClass('on').siblings().removeClass('on');
			//siblings()형제요소 //top - 300(스피드 속도값을 빼서 타이밍을 좀더 빠르게)
			sideNav.eq(i).addClass('on').siblings().removeClass('on');
			sections.eq(i).addClass('on').siblings().removeClass('on');
			//전부 다 연결시킴. 클래스는 on으로 통일해야 된다. 숫자도 같아야 함.
		}
	});

	/* if(sct > 400){
        $('nav').addClass('sticky');
    } else {
        $('nav').removeClass('sticky');
    } */
	//삼항연산자. 조건 ? 진실일때 할 일 : 거짓일 때 할 일
	sct > 400 ? $('nav').addClass('sticky') : $('nav').removeClass('sticky');
});

$(function () {
	const progressWrap = $('.progress-bar');
	const animationOst = $('.animation').offset().top - 600;
	let isAni = false;
	//윈도우의 스크롤 탑값이 애니메이션의 오프셋의 값보다 크거나 같고 isAni의 값이 false면 조건문 실행=> 윈도우의 스크롤바가 스킬바 섹션 안으로 진입했고 애니메이션은 미실행 상태
	$(window).scroll(function () {
		if ($(window).scrollTop() >= animationOst && !isAni) {
			progressAnimation();
		}
	});

	//애니메이션바

	function progressAnimation() {
		progressWrap.each(function () {
			var $this = $(this),
				progressBar = $this.find('.bar'),
				progressText = $this.find('.rate'),
				progressRate = progressText.attr('data-rate');
			progressBar.animate({ width: progressRate + '%' }, 2500);
			// console.log(progressText);

			const textFn = function () {
				$({ rate: 0 })
					.stop()
					.animate(
						{ rate: progressRate },
						{
							duration: 2000,
							progress: function () {
								let now = this.rate;
								progressText.text(Math.floor(now) + '%');
							},
							complete: function () {
								isAni = true;
							},
						}
					);
			};
		});
	}
});

//타입 애니메이션
$(document).ready(function () {
	setInterval(function () {
		var currentText = $('#animated-text').text();
		if (currentText == '디자이너') {
			$('#animated-text').text('나무늘보');
		} else {
			$('#animated-text').text('디자이너');
		}
	}, 2500); // Change text every second
});

// 프로젝트 애니메이션
projects.each((i, project) => {
	const projectTop = $(project).offset().top;
	console.log(projectTop);
	topArr.push(projectTop);
	console.log(topArr);
});

win.on('scroll', () => {
	winSCT = win.scrollTop();
	// 프로젝트 애니메이션
	// 목업이 날아옴
	// 프로젝트1
	if (winSCT > topArr[0] - speed) {
		/* section.removeClass('is-animated') */
		projects.eq(0).addClass('is-animated').siblings().removeClass('is-animated');
	}
	// 프로젝트2
	if (winSCT > topArr[1] - speed) {
		projects.eq(1).addClass('is-animated').siblings().removeClass('is-animated');
		console.log(projects);
		pipScroll();
	}
});

// 마스크의 높이 / 스크린의 높이
function pipScroll() {
	const devices = $('.mockup.pc, .mockup.mobile');
	devices.each(function (i, deviceEl) {
		let device = $(this);
		let screen = device.find('.mask>img');
		let mask = device.find('.mask');
		let heightDifference = screen.innerHeight() - mask.innerHeight();
		device.data('heightDifference', heightDifference);
		device.on({
			mouseenter: function () {
				screen.stop().animate({ top: -heightDifference }, 1000);
			},
			mouseleave: function () {
				screen.stop().animate({ top: 0 }, 1000);
			},
		});
	});
}
win.on('resize', function () {
	pipScroll();
});
