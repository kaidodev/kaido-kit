function! kaido#before() abort
    let g:neoformat_enabled_typescript=['prettier']
    let g:spacevim_colorscheme = 'onedark'
    let g:spacevim_colorscheme_bg = 'dark'
endfunction

function! kaido#after() abort
  let g:neomake_typescript_enabled_makers=[]
endfunction

