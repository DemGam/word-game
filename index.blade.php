@extends('layouts.master')

@section('headerScripts')

{{-- SweetAlert--}}
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.6/sweetalert2.min.css" integrity="sha256-zgaKkhKpXzSrPyXVfczHhygcPSHyhHD+PSWnq3LZHHs=" crossorigin="anonymous" />

<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.6/sweetalert2.min.js" integrity="sha256-NBMm26+MVgnPpBR/jdmM0orRevP7j26HoHC3IPW/T+k=" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>

<link rel="stylesheet" href="/css/wordgame/wg-style.css">

@endsection

@section('header')

@if(Website::getWebsiteTypeID() == 1 || Website::getWebsiteTypeID() == 4 || Website::getWebsiteTypeID() == 5)

@include('layouts.usermenu')

@elseif(Website::getWebsiteTypeID() == 2)

@include('panel.partials.topmenu-user')

@endif

@endsection

@section('content')
<style type="text/css">
    #puzzle {
        position: relative;
        margin: auto;
    }

    .timer_block {
        z-index: 999;
    }
</style>
<section class="quiz_block">
  <div class="container">
		<div class="row">
			<div class="col-md-3" id="hidden_block">

				@if(Website::getWebsiteTypeID() == 1)

				@include('layouts.mainblockleft')

				@elseif(Website::getWebsiteTypeID() == 2)

				@include('panel.partials.mainblockleft')

				@elseif(Website::getWebsiteTypeID() == 4 || Website::getWebsiteTypeID() == 3 || Website::getWebsiteTypeID() == 5)

				@include('layouts.mainblockleft-minigame')

				@endif

			</div>

			<div class="col-md-9 d_padding">
				<div class="game-home__game-main-block main-game-home">
					<div class="main-game-home__body">
						<div class="main-game-home__header">

							<div class="wg-game__timer wg-timer">
								<div class="wg-timer__wrapper">
									<div class="wg-timer__dial"></div>
									<div class="wg-timer__text" id="timer-count"></div>
								</div>
							</div>

						</div>
						<!-- ==================================== -->

						<div class="main-game-home__game-wrapper wg-game__wrapper">

							<div class="wg-game">
								<div class="wg-game__body wg-body">
									<div class="wg-body__category-wrapper">
										<div class="wg-body__category" id="clue-word"></div>
									</div>

									<div class="wg-body__word" id="wg-body__word">
									</div>

									<div class="wg-body__alphabet" id="wg-alphabet">
									</div>

								</div>
							</div>

							<!-- ==================================== -->

						</div>

					</div>

					<div class="main-game-home__final-message final-message-game">
						<div class="final-message-game__body">
							<p class="final-message-game__text"></p>
						</div>
					</div>

				</div>
			</div>
		</div>
  </div>
</section>

@endsection

@section('footer')

@if(Website::getWebsiteTypeID() == 1 || Website::getWebsiteTypeID() == 4)

@include('layouts.footer')

@elseif(Website::getWebsiteTypeID() == 2)

@include('panel.partials.footer')

@endif

<script>
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_En/sdk.js#xfbml=1&version=v2.9";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>

<audio id="success-click-sound" src="/media/wordgame/success_click.mp3" preload="auto"></audio>
<audio id="fail-click-sound" src="/media/wordgame/fail_click.mp3" preload="auto"></audio>
<audio id="win-sound" src="/media/wordgame/win.mp3" preload="auto"></audio>
<audio id="loose-sound" src="/media/wordgame/loose.mp3" preload="auto"></audio>

<script>
    let startTime = {{ $timeout }}; // seconds to timeout
    let failDeductTime = {{ $wordGame->deduct_time }}; // seconds to deduct per wrong letter

    let word = "{{ $word->word }}"; // Word for user to guess
		let alphabet1 = "qwertyuiopå";
		let alphabet2 = "asdfghjklæø";
		let alphabet3 = "zxcvbnm";
    let clueWord = "{{ $word->hint }}"; // Word for user to tip

    let letterColor = "#3B6BB8"; // Hex color
    let letterColorWrong = "#801414"; // Hex color
    let letterColorCorrect = "#42610F"; // Hex color

    let successText = "Correct word!";
    let failureText = "Try again later";
    let redirectionDelay = 2; // in seconds
    let sessionID = {{ $playID }}; // session identifier
    let forwardURL = "{{ route('game.word.score', ['gameID' => $wordGame->game_id, 'playID' => $playID]) }}/"; // There must be "/" at the end
</script>
<script src="/js/wordgame/wg-app.js"></script>

@endsection