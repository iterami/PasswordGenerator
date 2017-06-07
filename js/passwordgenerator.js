'use strict';

function generate(){
    core_storage_save();

    if(core_storage_data['touse'].length <= 0){
        document.getElementById('passwords').innerHTML = 'You must select at least one option.';
        return;
    }

    // Generate passwords.
    var loopcounter = core_storage_data['repeat'] - 1;
    var passwords = '';
    do{
        passwords += string_format_html({
          'string': core_random_string({
            'characters': core_storage_data['touse'],
            'length': core_storage_data['length'] - 1,
          }),
        }) + '<br>';
    }while(loopcounter--);
    document.getElementById('passwords').innerHTML = passwords;
}

function repo_init(){
    core_repo_init({
      'storage': {
        'length': 15,
        'repeat': 1,
        'touse': '0123456789abcdefghijklmnopqrstuvwxyzáčďéěíňóřšťúůýžABCDEFGHIJKLMNOPQRSTUVWXYZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?',
      },
      'title': 'PasswordGenerator.htm',
    });
    core_events_bind({
      'keybinds': {
        13: {
          'todo': generate,
        },
      },
    });

    core_storage_update();
    generate();

    document.getElementById('generate').onclick = generate;
    document.getElementById('storage-reset').onclick = function(e){
        core_storage_reset();
    };
}
