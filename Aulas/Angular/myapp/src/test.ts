// Este arquivo é requerido pelo karma.conf.js e carrega recursivamente todos os arquivos .spec e framework
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// Primeiro, inicialize o ambiente de teste Angular.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Então encontramos todos os testes.
const context = require.context('./', true, /\.spec\.ts$/);
// E carregue os módulos.
context.keys().map(context);
