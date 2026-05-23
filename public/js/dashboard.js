/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/dashboard.js":
/*!***********************************!*\
  !*** ./resources/js/dashboard.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener('DOMContentLoaded', function () {
  var unidadeSelect = document.getElementById('unidade_id');
  unidadeSelect.addEventListener('change', function () {
    carregarLinhasSelect(this.value);
  });
  var btnFiltrar = document.getElementById('btn-filtrar');
  btnFiltrar.addEventListener('click', function () {
    var unidadeId = document.getElementById('unidade_id').value;
    var linhaId = document.getElementById('linha_id').value;
    var mes = document.getElementById('mes').value;
    var ano = document.getElementById('ano').value;
    var warningMessage = document.getElementById('warning-message');
    if (!unidadeId) {
      warningMessage.innerHTML = "\n                <p class=\"text-sm text-red-500 mt-1\">\n                    \xC9 necess\xE1rio selecionar uma unidade para carregar os dados do dashboard\n                </p>\n            ";
      return;
    }
    warningMessage.innerHTML = '';
    carregarLinhas(unidadeId, linhaId, mes, ano);
    carregarGrafico(unidadeId, linhaId, mes, ano);
  });
});
function carregarLinhasSelect(unidadeId) {
  var selectLinha = document.getElementById('linha_id');
  selectLinha.innerHTML = "\n        <option value=\"\">\n            Carregando...\n        </option>\n    ";
  fetch("/dashboard/unidade/".concat(unidadeId, "/linhas")).then(function (res) {
    return res.json();
  }).then(function (data) {
    selectLinha.innerHTML = "\n                <option value=\"\">\n                    Selecione uma linha\n                </option>\n            ";
    data.forEach(function (linha) {
      selectLinha.innerHTML += "\n                    <option value=\"".concat(linha.id, "\">\n                        ").concat(linha.linha, "\n                    </option>\n                ");
    });
  })["catch"](function (error) {
    console.error(error);
    selectLinha.innerHTML = "\n                <option value=\"\">\n                    Erro ao carregar linhas\n                </option>\n            ";
  });
}
function carregarLinhas(unidadeId, linhaId, mes, ano) {
  var params = new URLSearchParams({
    mes: mes,
    ano: ano
  });
  if (linhaId) {
    params.append('linha_id', linhaId);
  }
  fetch("/dashboard/linhas/".concat(unidadeId, "?").concat(params.toString())).then(function (res) {
    return res.json();
  }).then(function (data) {
    var container = document.getElementById('dashboard-lista');
    container.innerHTML = data.map(function (l) {
      var _l$producoes, _l$unidade;
      var producao = ((_l$producoes = l.producoes) === null || _l$producoes === void 0 ? void 0 : _l$producoes[0]) || {
        quantidade_produzida: 0,
        quantidade_defeituosa: 0,
        produtividade: 0
      };
      return "\n                    <div class=\"space-y-3\">\n                        <div class=\"flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gray-50 hover:bg-gray-100 transition rounded-2xl px-5 py-4 mb-4 border border-gray-200\">\n                            <div class=\"flex items-center gap-4 min-w-[140px]\">\n                                <div>\n                                    <h3 class=\"text-base font-bold text-gray-800\">\n                                        Linha: ".concat(l.linha, "\n                                    </h3>\n                                    <p class=\"text-sm text-gray-500\">\n                                        ").concat(((_l$unidade = l.unidade) === null || _l$unidade === void 0 ? void 0 : _l$unidade.unidade) || '-', "\n                                    </p>\n                                </div>\n                            </div>\n                            <div class=\"flex flex-wrap gap-3\">\n                                <div class=\"bg-green-500 text-white rounded-xl px-4 py-3 min-w-[140px] shadow-sm\">\n                                    <div class=\"flex items-center justify-between mb-1\">\n                                        <span class=\"text-xs uppercase tracking-wide text-green-100\">\n                                            Produ\xE7\xE3o\n                                        </span>\n                                    </div>\n                                    <div class=\"text-2xl font-bold\">\n                                        ").concat(producao.quantidade_produzida, "\n                                    </div>\n                                </div>\n                                <div class=\"bg-red-500 text-white rounded-xl px-4 py-3 min-w-[140px] shadow-sm\">\n                                    <div class=\"flex items-center justify-between mb-1\">\n                                        <span class=\"text-xs uppercase tracking-wide text-red-100\">\n                                            Perdas\n                                        </span>\n                                    </div>\n                                    <div class=\"text-2xl font-bold\">\n                                        ").concat(producao.quantidade_defeituosa, "\n                                    </div>\n                                </div>\n                                <div class=\"bg-gray-900 text-white rounded-xl px-5 py-3 min-w-[140px] shadow-md border border-gray-700\">\n                                    <div class=\"text-xs uppercase tracking-wide text-gray-400 mb-1\">\n                                        Efici\xEAncia\n                                    </div>\n                                    <div class=\"flex items-center gap-2\">\n                                        <span class=\"text-3xl font-extrabold text-yellow-300\">\n                                            ").concat(producao.produtividade, "%\n                                        </span>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>");
    }).join('');
  })["catch"](function (error) {
    console.error(error);
  });
}
function carregarGrafico(unidadeId, linhaId, mes, ano) {
  var params = new URLSearchParams({
    mes: mes,
    ano: ano
  });
  if (linhaId) {
    params.append('linha_id', linhaId);
  }
  fetch("/dashboard/grafico/".concat(unidadeId, "?").concat(params.toString())).then(function (res) {
    return res.json();
  }).then(function (data) {
    var labels = data.map(function (i) {
      return i.linha;
    });
    var valores = data.map(function (i) {
      return i.produtividade;
    });
    var cores = data.map(function (i) {
      return i.cor;
    });
    var canvas = document.getElementById('graficoProdutividade');
    var graficoExistente = Chart.getChart(canvas);
    if (graficoExistente) {
      graficoExistente.destroy();
    }
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Eficiência (%)',
          data: valores,
          backgroundColor: cores,
          borderRadius: 12
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  })["catch"](function (error) {
    console.error(error);
  });
}

/***/ }),

/***/ 1:
/*!*****************************************!*\
  !*** multi ./resources/js/dashboard.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\PC\Documents\desafio-tecnico\resources\js\dashboard.js */"./resources/js/dashboard.js");


/***/ })

/******/ });