$(function () {
    const isIndex = $('.btn[data-action="edit"]').length > 0;

    let boardJson: string | null;
    let hasParam = false;

    const params = new URLSearchParams(window.location.search);

    if (params.has('board')) {
        // noinspection JSDeprecatedSymbols
        boardJson = atob(params.get('board')!);
        hasParam = true;
    } else {
        boardJson = localStorage.getItem('board');
    }

    if (boardJson != null && isIndex) {
        const board = JSON.parse(boardJson);

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                $(`tr[data-row=${i}]`)
                    .children(`td[data-col=${j}]`)
                    .text(board[i][j]);
            }
        }
    }

    // noinspection JSDeprecatedSymbols
    $('.twitter-share-button').attr(
        'data-url',
        hasParam ? location.href : `${location.href}?board=${btoa(boardJson!)}`,
    );

    $('td').on('click', function () {
        $(this).toggleClass('clicked');
    });

    $('.btn[data-action="save"]').on('click', function () {
        let board = new Array(5).fill(null).map(function () {
            return new Array(5).fill('&dash;');
        });

        $('textarea').each(function () {
            const row = parseInt(this.parentElement!.parentElement!.getAttribute('data-row')!);
            const col = parseInt(this.parentElement!.getAttribute('data-col')!);
            board[row][col] = (this as HTMLTextAreaElement).value;
        });

        localStorage.setItem('board', JSON.stringify(board));
        location.href = '/bingo';
    });
});