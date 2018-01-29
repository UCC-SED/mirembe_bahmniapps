'use strict';

var Bahmni = Bahmni || {};
Bahmni.Clinical = Bahmni.Clinical || {};
Bahmni.Clinical.DisplayControl = Bahmni.Clinical.DisplayControl || {};
Bahmni.Clinical.Program = Bahmni.Clinical.Program || {};
Bahmni.Clinical.Program.FormConditions = Bahmni.Clinical.Program.FormConditions || {};

angular.module('bahmni.clinical', ['bahmni.common.config', 'bahmni.common.domain',
    'bahmni.common.conceptSet', 'bahmni.common.uiHelper', 'bahmni.common.gallery', 'bahmni.common.logging']);
