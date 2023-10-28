const win = $(window);
const sections = $('.section');
const projects = $('.projects');
const progressBarItems = $('.progress-bar');
let topArr = [];
let isAni = false;
const speed = Math.floor(win.height() * 0.9); // speed 변수 추가
/* 프로젝트 섹션 상단좌표 */
projects.each((i, project) => {
	topArr.push($(project).offset().top);
});

$('.gnb li').on('click', function () {
	const index = $(this).index();
	const offset = sections.eq(index).offset().top;
	$('html, body').stop().animate({ scrollTop: offset }, 1000, 'easeOutCirc');
});

/* 스크롤 함수 */
win.on('scroll', () => {
	const scrollTop = win.scrollTop();
	sections.each(function (i) {
		if (scrollTop >= sections.eq(i).offset().top - 300) {
			$('.gnb li').eq(i).addClass('on').siblings().removeClass('on');
		}
	});

	$('nav').toggleClass('sticky', scrollTop > 400);

	if (scrollTop > topArr[0] - speed) {
		projects.eq(0).addClass('is-animated').siblings().removeClass('is-animated');
		pipScroll();
	}
	if (scrollTop > topArr[1] - speed) {
		projects.eq(1).addClass('is-animated').siblings().removeClass('is-animated');
		pipScroll();
	}

	if (scrollTop >= $('.animation').offset().top - 600 && !isAni) progressAnimation();
});

// 자기소개 애니메이션
var animation = bodymovin.loadAnimation({
	container: document.getElementById('anislow'), // Required
	// 다운받은 제이쿼리 넣기
	path: './ani_slow.json', // Required
	renderer: 'svg', // Required
	loop: true, // Optional
	autoplay: true, // Optional
})


//애니메이션바
function progressAnimation() {
	progressBarItems.each(function () {
		const progressBar = $(this).find('.bar');
		const progressRate = $(this).find('.rate').attr('data-rate');
		progressBar.animate({ width: progressRate + '%' }, 2500);
	});
}

//타입 애니메이션
setInterval(function () {
	const animatedText = $('#animated-text');
	animatedText.text(animatedText.text() == '디자이너' ? '나무늘보' : '디자이너');
}, 2500);


// 프로젝트 애니메이션
function pipScroll() {
	$('.mockup.pc, .mockup.mobile').each(function () {
		const device = $(this);
		const screen = device.find('.mask>img');
		const mask = device.find('.mask');
		const heightDifference = screen.innerHeight() - mask.innerHeight();
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

win.on('resize', pipScroll);

$('.tad-wrapper').each(function () {
	const targetLink = $(this).find('.tab-menu a');
	const tabContent = $(this).find('.tab-content>div');
	targetLink.on('click', function (e) {
		e.preventDefault();
		const currentLink = $(this).attr('href');
		tabContent.hide();
		$(currentLink).show();
		targetLink.removeClass('active');
		$(this).addClass('active');
	});
});

const lightbox = $('#lightbox');
const lightImg = $('#lightImage');

$('.pic').on('click', function () {
	lightImg.attr('src', $(this).data('src'));
	lightbox.show();
	$('.port-container').addClass('all_scrollFixed');
});

lightbox.on('click', function () {
	lightbox.hide();
	$('.port-container').removeClass('all_scrollFixed');
});
