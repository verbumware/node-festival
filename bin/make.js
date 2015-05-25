#!/usr/bin/env node

'use strict';

var fs = require('fs'),
    zlib = require('zlib'),
    tar = require('tar'),
    request = require('request');

var sitePath = 'http://festvox.org/packed/festival/2.4/',
    files = [
        'festival-2.4-release',
        'festlex_CMU',
        'festlex_OALD',
        'festlex_POSLEX'
    ],
    voices = [
        'cmu_us_ahw_cg',
        'cmu_us_aup_cg',
        'cmu_us_awb_cg',
        'cmu_us_axb_cg',
        'cmu_us_bdl_cg',
        'cmu_us_clb_cg',
        'cmu_us_fem_cg',
        'cmu_us_gka_cg',
        'cmu_us_jmk_cg',
        'cmu_us_ksp_cg',
        'cmu_us_rms_cg',
        'cmu_us_rxr_cg',
        'cmu_us_slt_cg',
        'kallpc16k',
        'rablpc16k'
    ];

    // fs.mkdir('build', function (er1) {
    //     if (er1) { console.log(er1); }
    //     fs.mkdir('build/voices', function (er2) {
    //         if (er2) { console.log(er2); }

    files.forEach(function (e) {
        var fname = e + '.tar.gz';
            // wstream = fs.createWriteStream('build/' + fname + '.tar');

        request
            .get(sitePath + fname)
            .on('response', function () {
                console.log(fname + ' started.');
            })
            .on('end', function () {
                console.log(fname + ' downloaded.');
            })
            .pipe(
                zlib.createGunzip()
                .on('end', function () {
                    console.log(fname + ' unziped.');
                })
            )
            .pipe(
                tar
                    .Extract({ path: 'build' })
                    .on('end', function () {
                        console.log(fname + ' untared.');
                    })
            );
            // .pipe(wstream);
    });

    voices.forEach(function (e) {
        var fname = 'festvox_' + e + '.tar.gz';
            // wstream = fs.createWriteStream('build/voices/' + fname + '.tar');

        request
            .get(sitePath + 'voices/' + fname)
            .on('response', function () {
                console.log(fname + ' started.');
            })
            .pipe(
                zlib.createGunzip()
                .on('end', function () {
                    console.log(fname + ' unzip done.');
                })
            )
            .pipe(
                tar
                    .Extract({ path: 'build' })
                    .on('end', function () {
                        console.log(fname + ' untar done.');
                    })
            );
            // .pipe(wstream);
    });

    //     });
    // });
