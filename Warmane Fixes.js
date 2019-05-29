// ==UserScript==
// @name         Warmane Fixes v2
// @namespace    http*://*.warmane.com/
// @version      1.0
// @description  Fixes various template errors and adds quality of life changes
// @author       LeoTHPS
// @noframes
// @run-at       document-end
// @match        http*://*.warmane.com/*
// @exclude      http*://forum.warmane.com/modcp/*
// @grant        none
// ==/UserScript==

var WarmaneFixes = {
    Config: {
        Theme: {
            RemoveVideo: true,
            ReplaceBackground: true,
            BackgroundColor: '#120D09',
            BackgroundImage: 'http://media.mmo-champion.com/images/news/2013/may/news_background_wow.jpg'
        },

        Armory: {
            Guild: {
                Summary: {
                    OddTextColor: '#777777',
                    OddBackgroundColor: '#060606',

                    EvenTextColor: '#777777',
                    EvenBackgroundColor: '#131313'
                },

                BossFights: {
                    OddTextColor: '#777777',
                    OddBackgroundColor: '#060606',

                    EvenTextColor: '#777777',
                    EvenBackgroundColor: '#131313'
                }
            },

            Character: {
                Summary: {
                    RemoveModel: false
                },

                MatchHistory: {
                },

                Achievements: {
                    TextColor: '#606060',
                    BackgroundColor: '#0d0d0d',
                    
                    CompletedTextColor: '#12b500',
                    CompletedBackgroundColor: '#0d0d0d'
                },

                Talents: {
                },

                Statistics: {
                    OddTextColor: '#777777',
                    OddBackgroundColor: '#060606',

                    EvenTextColor: '#777777',
                    EvenBackgroundColor: '#131313'
                },

                MountsAndCompanions: {
                },

                Reputation: {
                }
            }
        },

        Forum: {
            LockIcon: 'http://i.imgur.com/1cijdKp.png',

            ThreadPrefixColors: {
                'Sticky': '#00b520',
                'Moderated': '#ff0000'
            },

            SidePanel: {
                Enabled: true,

                MinWidth: 130,

                NavLinks: [
                    // text         url                                           color     new tab
                    [ 'New Posts', '//forum.warmane.com/search.php?do=getdaily', '#ffd400', false],
                ]
            }
        }
    },

    URL: {
        Path: window.location.pathname,
        FullPath: window.location.pathname + window.location.search,
        SubDomain: window.location.hostname.substr(0, window.location.hostname.indexOf('.'))
    }
};

WarmaneFixes.Update = function() {
    if (WarmaneFixes.Config.Theme.RemoveVideo) {
        var videoFrame = $('#page-frame');
        var video = videoFrame.find('video');

        video.get(0).pause();

        videoFrame.empty();
        videoFrame.height(210);
    }

    if (WarmaneFixes.Config.Theme.ReplaceBackground) {
        $('html').css(
            'background-color', 'transparent'
        );

        $('body').css({
            'background-repeat': 'no-repeat',
            'background-attachment': 'fixed',
            'background-color': WarmaneFixes.Config.Theme.BackgroundColor,
            'background-image': 'url(' + WarmaneFixes.Config.Theme.BackgroundImage + ')'
        });
    }

    switch (WarmaneFixes.URL.SubDomain) {
        case '':
        case 'www':
            WarmaneFixes.UpdateIndex();
            break;

        case 'forum':
            WarmaneFixes.UpdateForum();
            break;

        case 'armory':
            WarmaneFixes.UpdateArmory();
            break;
    }
}

WarmaneFixes.UpdateIndex = function() {

}

WarmaneFixes.UpdateArmory = function() {
    var query = WarmaneFixes.URL.Path.match(
        /\/([^\/]+)\/([^\/]+)\/([^\/]+)\/([^\/]+)/
    );
    
    if (query != null) {
        switch (query[1]) {
            case 'guild':
                WarmaneFixes.UpdateArmoryGuild(query[2], query[3], query[4]);
                break;

            case 'character':
                WarmaneFixes.UpdateArmoryCharacter(query[2], query[3], query[4]);
                break;
        }
    }
}

WarmaneFixes.UpdateArmoryGuild = function(name, realm, type) {
    switch (type) {
        case 'summary':
            WarmaneFixes.UpdateArmoryGuildSummary(name, realm);
            break;

        case 'boss-fights':
            WarmaneFixes.UpdateArmoryGuildBossFights(name, realm);
            break;
    }
}

WarmaneFixes.UpdateArmoryGuildSummary = function(name, realm) {
    var style = WarmaneFixes.CreateElement('style');

    style.html(
        '#data-table > tbody tr.odd {' +
            'color: ' + WarmaneFixes.Config.Armory.Guild.Summary.OddTextColor + ' !important;' +
            'background-color: ' + WarmaneFixes.Config.Armory.Guild.Summary.OddBackgroundColor + ' !important;' +
        '}\n' +
        '#data-table > tbody tr.even {' +
            'color: ' + WarmaneFixes.Config.Armory.Guild.Summary.EvenTextColor + ' !important;' +
            'background-color: ' + WarmaneFixes.Config.Armory.Guild.Summary.EvenBackgroundColor + ' !important;' +
        '}'
    );

    $('head').append(
        style
    );
}

WarmaneFixes.UpdateArmoryGuildBossFights = function(name, realm) {
    var style = WarmaneFixes.CreateElement('style');

    style.html(
        '#data-table > tbody tr.odd {' +
            'color: ' + WarmaneFixes.Config.Armory.Guild.BossFights.OddTextColor + ' !important;' +
            'background-color: ' + WarmaneFixes.Config.Armory.Guild.BossFights.OddBackgroundColor + ' !important;' +
        '}\n' +
        '#data-table > tbody tr.even {' +
            'color: ' + WarmaneFixes.Config.Armory.Guild.BossFights.EvenTextColor + ' !important;' +
            'background-color: ' + WarmaneFixes.Config.Armory.Guild.BossFights.EvenBackgroundColor + ' !important;' +
        '}'
    );

    $('head').append(
        style
    );
}

WarmaneFixes.UpdateArmoryCharacter = function (name, realm, type) {
    switch (type) {
        case 'summary':
            WarmaneFixes.UpdateArmoryCharacterSummary(name, realm);
            break;

        case 'match-history':
            WarmaneFixes.UpdateArmoryCharacterMatchHistory(name, realm);
            break;

        case 'achievements':
            WarmaneFixes.UpdateArmoryCharacterAchievements(name, realm);
            break;

        case 'talents':
            WarmaneFixes.UpdateArmoryCharacterTalents(name, realm);
            break;

        case 'statistics':
            WarmaneFixes.UpdateArmoryCharacterStatistics(name, realm);
            break;

        case 'mounts-and-companions':
            WarmaneFixes.UpdateArmoryCharacterMountsAndCompanions(name, realm);
            break;

        case 'reputation':
            WarmaneFixes.UpdateArmoryCharacterReputation(name, realm);
            break;
    }
}

WarmaneFixes.UpdateArmoryCharacterSummary = function(name, realm) {
    if (WarmaneFixes.Config.Armory.Character.Summary.RemoveModel) {
        $('#character-profile .model').empty();
    }
}

WarmaneFixes.UpdateArmoryCharacterMatchHistory = function(name, realm) {

}

WarmaneFixes.UpdateArmoryCharacterAchievements = function (name, realm) {
    var style = WarmaneFixes.CreateElement('style');

    style.html(
        '.achievement {' +
            'color: ' + WarmaneFixes.Config.Armory.Character.Achievements.TextColor + ' !important;' +
            'background-color: ' + WarmaneFixes.Config.Armory.Character.Achievements.BackgroundColor + ' !important;' +
        '}\n' +
        '.achievement:not(.locked) {' +
            'color: ' + WarmaneFixes.Config.Armory.Character.Achievements.CompletedTextColor + ' !important;' +
            'background-color: ' + WarmaneFixes.Config.Armory.Character.Achievements.CompletedBackgroundColor + ' !important;' +
        '}'
    );

    $('head').append(
        style
    );
}

WarmaneFixes.UpdateArmoryCharacterTalents = function(name, realm) {

}

WarmaneFixes.UpdateArmoryCharacterStatistics = function(name, realm) {
    var style = WarmaneFixes.CreateElement('style');

    style.html(
        '#data-table > tbody tr.odd {' +
            'color: ' + WarmaneFixes.Config.Armory.Character.Statistics.OddTextColor + ' !important;' +
            'background-color: ' + WarmaneFixes.Config.Armory.Character.Statistics.OddBackgroundColor + ' !important;' +
        '}\n' +
        '#data-table > tbody tr.even {' +
            'color: ' + WarmaneFixes.Config.Armory.Character.Statistics.EvenTextColor + ' !important;' +
            'background-color: ' + WarmaneFixes.Config.Armory.Character.Statistics.EvenBackgroundColor + ' !important;' +
        '}'
    );

    $('head').append(
        style
    );
}

WarmaneFixes.UpdateArmoryCharacterMountsAndCompanions = function(name, realm) {

}

WarmaneFixes.UpdateArmoryCharacterReputation = function(name, realm) {

}

WarmaneFixes.UpdateForum = function() {
    WarmaneFixes.Config.Forum.Moderators = [
        'Arbiterone',
        'Empyrean',
        'Obnoxious',
        'Repost',
        'Mercy',
        'Palutena'
    ];

    WarmaneFixes.Config.Forum.ReportSubForum = 287;

    WarmaneFixes.Config.Forum.DisplayName = $('li.welcomelink a').text();

    WarmaneFixes.Config.Forum.IsModerator = WarmaneFixes.Config.Forum.Moderators.includes(
        WarmaneFixes.Config.Forum.DisplayName
    );

    // add ModCP to #navtabs
    if (WarmaneFixes.Config.Forum.IsModerator) {
        var navtabs_entry_mcp_link = WarmaneFixes.CreateElement('a');

        navtabs_entry_mcp_link.attr({
            'target': '_blank',
            'href': '//forum.warmane.com/modcp'
        });

        navtabs_entry_mcp_link.text('MODCP');
        navtabs_entry_mcp_link.addClass('navtab');

        var navtabs_entry_mcp = WarmaneFixes.CreateElement('li');

        navtabs_entry_mcp.append(navtabs_entry_mcp_link);

        $('ul#navtabs').append(navtabs_entry_mcp);
    }

    // create side panel
    if (WarmaneFixes.Config.Forum.SidePanel.Enabled) {
        var side_panel = WarmaneFixes.CreateElement('div');

        side_panel.css({
            'top': 164,
            'left': 0,
            'width': 'auto',
            'min-width': WarmaneFixes.Config.Forum.SidePanel.MinWidth,
            'height': 'auto',
            'position': 'fixed',
            'padding': 3,
            'text-align': 'center',
            'border': '1px solid #1e1e1e',
            'background-color': '#0F0F0F',
            'z-index': 10000
        });

        var side_panel_table = WarmaneFixes.CreateElement('table');

        side_panel_table.css({
            'width': '100%',
            'border': 'none'
        });
        
        // add nav links
        {
            var side_panel_nav_links = WarmaneFixes.CreateElement('ul');

            side_panel_nav_links.css(
                'list-style-type',
                'none'
            );

            $(WarmaneFixes.Config.Forum.SidePanel.NavLinks).each(function(index, value) {
                var side_panel_nav_links_entry_link = WarmaneFixes.CreateElement('a');

                side_panel_nav_links_entry_link.css({
                    'width': '100%',
                    'height': '100%',
                    'color': value[2],
                    'display': 'inline-block',
                    'text-decoration': 'none'
                });

                side_panel_nav_links_entry_link.hover(
                    function() {
                        side_panel_nav_links_entry_link.css(
                            'text-decoration',
                            'underline'
                        );
                    },
                    function () {
                        side_panel_nav_links_entry_link.css(
                            'text-decoration',
                            'none'
                        );
                    }
                );

                side_panel_nav_links_entry_link.text(
                    value[0]
                );
                side_panel_nav_links_entry_link.attr(
                    'href',
                    value[1]
                );

                if (value[3]) {
                    side_panel_nav_links_entry_link.attr(
                        'target',
                        '_blank'
                    );
                }

                var side_panel_nav_links_entry = WarmaneFixes.CreateElement('li');

                side_panel_nav_links_entry.css({
                    'display': 'block',
                    'text-align': 'center'
                });

                side_panel_nav_links_entry.append(
                    side_panel_nav_links_entry_link
                );

                side_panel_nav_links.append(
                    side_panel_nav_links_entry
                );
            });

            var side_panel_table_data = WarmaneFixes.CreateElement('td');

            side_panel_table_data.append(
                side_panel_nav_links
            );

            var side_panel_table_row = WarmaneFixes.CreateElement('tr');

            side_panel_table_row.append(
                side_panel_table_data
            );

            side_panel_table.append(
                side_panel_table_row
            );
        }

        // add unread private messages
        if (WarmaneFixes.URL.FullPath !== '/private.php') {
            $('#notifications > ul.popupbody > li > a').each(function() {
                if ($(this).attr('href').indexOf('private.php') !== -1) {
                    var side_panel_pm_list = WarmaneFixes.CreateElement('ul');

                    side_panel_pm_list.css(
                        'list-style-type',
                        'none'
                    );

                    WarmaneFixes.GetPageAsync('//forum.warmane.com/private.php', function(result) {
                        $(result).find('li.pmbit span.unread > a').each(function() {
                            var side_panel_pm_list_entry_link = WarmaneFixes.CreateElement('a');

                            side_panel_pm_list_entry_link.css({
                                'width': '100%',
                                'height': '100%',
                                'color': '#fff',
                                'display': 'inline-block',
                                'text-decoration': 'none'
                            });

                            side_panel_pm_list_entry_link.hover(
                                function() {
                                    side_panel_pm_list_entry_link.css(
                                        'text-decoration',
                                        'underline'
                                    );
                                },

                                function() {
                                    side_panel_pm_list_entry_link.css(
                                        'text-decoration',
                                        'none'
                                    );
                                }
                            );

                            side_panel_pm_list_entry_link.text(
                                $(this).text()
                            );
                            side_panel_pm_list_entry_link.attr(
                                'href',
                                $(this).attr('href')
                            );

                            var side_panel_pm_list_entry = WarmaneFixes.CreateElement('li');

                            side_panel_pm_list_entry.css({
                                'display': 'block',
                                'text-align': 'center'
                            });

                            side_panel_pm_list_entry.append(
                                side_panel_pm_list_entry_link
                            );

                            side_panel_pm_list.append(
                                side_panel_pm_list_entry
                            );
                        });

                        var side_panel_table_data = WarmaneFixes.CreateElement('td');

                        side_panel_table_data.append(
                            side_panel_pm_list
                        );

                        var side_panel_table_row = WarmaneFixes.CreateElement('tr');

                        side_panel_table_row.append(
                            side_panel_table_data
                        );

                        side_panel_table.append(
                            side_panel_table_row
                        );
                    });

                    return false;
                }
            });
        }

        // add open reports
        if (WarmaneFixes.Config.Forum.IsModerator) {
            var url = '//forum.warmane.com/forumdisplay.php?f=' +
                WarmaneFixes.Config.Forum.ReportSubForum + '&pp=50';

            WarmaneFixes.GetPageAsync(url, function(result) {
                var threads = $(result).find('.threadbit:not(.lock)');

                if (threads && threads.length) {
                    var report_list = WarmaneFixes.CreateElement('ul');

                    report_list.css(
                        'list-style-type',
                        'none'
                    );

                    $(threads).each(function(index, value) {
                        var link = $(value).find('a.title');

                        if (link.text().indexOf('Reported') !== -1) {
                            var report_list_entry_link = WarmaneFixes.CreateElement('a');

                            report_list_entry_link.css(
                                'text-decoration',
                                'none'
                            );

                            if (!link.hasClass('threadtitle_unread')) {
                                report_list_entry_link.css(
                                    'color',
                                    '#444'
                                );
                            }

                            report_list_entry_link.hover(
                                function() {
                                    report_list_entry_link.css(
                                        'text-decoration',
                                        'underline'
                                    );
                                },

                                function() {
                                    report_list_entry_link.css(
                                        'text-decoration',
                                        'none'
                                    );
                                }
                            );

                            report_list_entry_link.attr({
                                'href': link.attr('href'),
                                'title': value.find('div.threadinfo').attr('title')
                            });

                            report_list_entry_link.text(
                                'Report by ' + value.find('dl.threadauthor dt').text()
                            );

                            var report_list_entry = WarmaneFixes.CreateElement('li');

                            report_list_entry.css({
                                'display': 'block',
                                'text-align': 'center'
                            });

                            report_list_entry.append(
                                report_list_entry_link
                            );

                            report_list.append(
                                report_list_entry
                            );
                        }
                    });

                    var side_panel_table_data = WarmaneFixes.CreateElement('td');

                    side_panel_table_data.append(
                        report_list
                    );

                    var side_panel_table_row = WarmaneFixes.CreateElement('tr');

                    side_panel_table_row.append(
                        side_panel_table_data
                    );

                    side_panel_table.append(
                        side_panel_table_row
                    );
                }
            });
        }

        side_panel.append(
            side_panel_table
        );

        $('body').append(
            side_panel
        );
    }

    // fix new message links
    $('#notifications > ul.popupbody > li > a').each(function () {
        var obj = $(this);

        if (obj.attr('href').indexOf('tab=visitor_messaging') !== -1) {
            obj.attr('href', '//forum.warmane.com/member.php?username=' + WarmaneFixes.Config.Forum.DisplayName + '&tab=visitor_messaging');

            return false;
        }
    });

    // dim read threads
    $('.searchtitle a.title:not(.threadtitle_unread)').css('color', '#66666c');
    $('.threadmeta .author a.title:not(.threadtitle_unread)').css('color', '#66666c');

    // override lock icon on threads
    $('li.lock .threadstatus').css('background-image', 'url(' + WarmaneFixes.Config.Forum.LockIcon + ')');

    // override thread prefix colors and add brackets
    $('.threadbit').each(function () {
        var obj = $(this).children().find('.prefix');

        if (obj !== null) {
            var prefix = obj.text().match(/(\w+.+\w+)/g);

            obj.text('[' + prefix + ']');

            if (prefix in WarmaneFixes.Config.Forum.ThreadPrefixColors) {
                obj.css('color', WarmaneFixes.Config.Forum.ThreadPrefixColors[prefix]);
            }
        }
    });

    switch (WarmaneFixes.URL.Path) {
        case '/member.php':
            WarmaneFixes.UpdateForumProfile(
                $('.member_username').text()
            );
            break;

        case '/showthread.php':
            WarmaneFixes.UpdateForumThread();
            break;
    }
}

WarmaneFixes.UpdateForumProfile = function(name) {
    // fix navigation links
    {
        // use these later for filtering and patching
        var nav_page_link_test = 'member.php';
        var nav_page_link_should_contain = 'username=' + name;
        var nav_page_link_valid_base = nav_page_link_test + '?' + nav_page_link_should_contain;

        // we have to iterate over all the divs because
        // this template uses the same IDs multiple times
        $('div').each(function() {
            var obj = $(this);

            // check if div is a top or bottom link block
            if ((obj.attr('id') === 'pagination_top') ||
                (obj.attr('id') === 'pagination_bottom')) {

                // get links
                var nav_page_links = obj.children('form').children('span');

                $(nav_page_links).each(function() {
                    // test if the link is real
                    var a = $(this).children('a');
                    var href = a.attr('href');

                    if (href && (href.indexOf(nav_page_link_test) === 0)) {
                        // check if the link contains a username just in case it gets fixed (lol)
                        if (href.indexOf(nav_page_link_should_contain) === -1) {
                            a.attr('href', nav_page_link_valid_base + '&' + href.substring(nav_page_link_test.length + 1));
                        }
                    }
                });
            }
        });
    }

    // remove white background on avatars and enlarge image
    {
        $('#user_avatar').css({
            'width': 'auto',
            'height': 'auto',
            'max-width': 110,
            'max-height': 110
        });

        $('#user_avatar').attr(
            'src',
            $('#user_avatar').attr('src').replace('&type=thumb', '')
        );

        $('.friends_list a.image_friend_link > img').each(function () {
            var obj = $(this);

            obj.attr(
                'src',
                obj.attr('src').replace('&type=thumb', '')
            );
        });
    }

    // fix group icons and enlarge images
    $('a.group_pic').each(function (index, value) {
        var obj = $(value);

        var group_href = obj.attr('href');
        var group_id = group_href.substr(group_href.indexOf('groupid=') + 8);
        var group_img = obj.find('img');

        group_img.css({
            'width': 'auto',
            'height': 'auto',
            'max-width': 90,
            'max-height': 90
        });

        group_img.attr(
            'src',
            'http://forum.warmane.com/image.php?groupid=' + group_id + '&dateline=' + $.now() + '&type=groupthumb'
        );
    });

    // set max-width/max-height on visitor message images
    $('#message_list > .postbit > .userprof_vmright > .userprof_content img').css({
        'max-width': '100%',
        'max-height': '100%'
    });

    // add checkbox to select/deselect all visitor messages
    if (WarmaneFixes.Config.Forum.IsModerator) {
        var checkBox = WarmaneFixes.CreateElement('input');

        checkBox.attr(
            'type',
            'checkbox'
        );

        checkBox.css({
            'display': 'inline',
            'clip': 'auto',
            'width': '15px',
            'height': '15px',
            'cursor': 'pointer'
        });

        checkBox.click(function() {
            var isChecked = $(this).prop('checked');
            var checkedPosition = isChecked ? '-15px' : '0px';

            $('#postlist ol#message_list > li').each(function() {
                var vmLabel = $(this).find('span.postbit-right > span.userprof_postbititem').eq(5).find('label');

                if (vmLabel.css('background-position-y') != checkedPosition) {
                    vmLabel.trigger('click');
                }
            });
        });

        var above_postlist = $('#above_postlist');

        above_postlist.css(
            'margin-right',
            25
        );

        above_postlist.append(
            checkBox
        );
    }
}

WarmaneFixes.UpdateForumThread = function () {
    // show current thread rating
    $('#threadrating_current').removeClass('hidden');

    // show user online/offline icon next to names
    $('div.username_container').each(function (obj) {
        obj = $(this);
        var obj_link = obj.find('a.username');

        if (obj_link) {
            if (obj_link.hasClass('online')) {
                obj.css(
                    'background',
                    'url(//forum.warmane.com/warmane/statusicon/user-online.png) top left no-repeat'
                );
            }
            else if (obj_link.hasClass('offline')) {
                obj.css(
                    'background',
                    'url(//forum.warmane.com/warmane/statusicon/user-offline.png) top left no-repeat'
                );
            }
        }
    });
    
    // highlight moderated posts
    $('div.posthead span.nodecontrols').each(function() {
        var obj = $(this);

        if (objtext().indexOf('Moderated Post') !== -1) {
            obj.css('color', '#ff0000');
        }
    });

    // fix profile link if thread is part of infraction and report discussion
    {
        var navbits = $('#breadcrumb > ul.floatcontainer').find('a');

        if (navbits.eq(navbits.length - 1).attr('href').endsWith(WarmaneFixes.Config.Forum.ReportSubForum)) {
            $('.postrow').find('.postcontent').find('a').each(function() {
                var obj = $(this);
                var href = obj.attr('href');

                if (href.endsWith('/member.php')) {
                    obj.attr('href', href + '?username=' + obj.text());
                }
            });
        }
    }
}

WarmaneFixes.GetPageAsync = function(url, onLoad) {
    return $.get(
        url,
        onLoad
    );
}

WarmaneFixes.CreateElement = function(type) {
    var element = document.createElement(type);

    return $(element);
}

WarmaneFixes.Update();
