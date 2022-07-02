// Task #1. Get Posts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var dashboard1 = document.querySelector("section[name='section1']");
var buttonGet = document.querySelector("form[name='form1'] button[name='get']");
var buttonRemove = document.querySelector("form[name='form1'] button[name='remove']");
function getPosts(url) {
    return __awaiter(this, void 0, void 0, function () {
        var res, json, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    json = _a.sent();
                    //console.log(json);
                    return [2 /*return*/, json];
                case 3:
                    e_1 = _a.sent();
                    alert(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function displayPosts(data) {
    data.then(function (value) {
        var itemDiv;
        for (var i = 0; i < value.length; i++) {
            itemDiv = document.createElement("div");
            itemDiv.innerHTML = "<p>" + value[i].title + "</p>";
            dashboard1.append(itemDiv);
        }
    })["catch"](function (error) { return console.log(error.message); });
}
buttonGet.addEventListener("click", function (event) {
    event.preventDefault();
    var posts = getPosts("https://jsonplaceholder.typicode.com/posts");
    if (posts !== undefined) {
        displayPosts(posts);
        buttonGet.disabled = true;
        buttonRemove.disabled = false;
    }
    else {
        alert("Error: No JSON data.");
    }
}, false);
buttonRemove.addEventListener("click", function (event) {
    event.preventDefault();
    dashboard1.innerHTML = "";
    buttonGet.disabled = false;
    buttonRemove.disabled = true;
}, false);
// Task #2. Update Object in Array
var dashboard2 = document.querySelector("section[name='section2']");
var newID = document.querySelector("form[name='form2'] input[name='id']");
var newName = document.querySelector("form[name='form2'] input[name='new_name']");
var buttonUpdate = document.querySelector("form[name='form2'] button[name='update']");
var userList = [
    { 'id': 1, 'name': 'Dima' },
    { 'id': 2, 'name': 'Pete' },
    { 'id': 3, 'name': 'Alex' },
    { 'id': 4, 'name': 'Ivan' },
    { 'id': 5, 'name': 'Vins' },
];
function updateObjectInArray(initialArray, key, value, patch) {
    var newArray = initialArray.slice();
    if (value <= newArray.length) {
        for (var i = 0; i < newArray.length; i++) {
            if (newArray[i].id === value) {
                newArray[i].name = patch.name;
            }
        }
        dashboard2.innerHTML = "";
        displayArray(newArray);
    }
    else {
        alert("Incorrect ID.");
    }
}
function displayArray(arr) {
    var itemDiv, itemP;
    for (var i = 0; i < arr.length; i++) {
        itemDiv = document.createElement("div");
        itemDiv.innerHTML = "<p>ID: " + arr[i].id + "; Name: " + arr[i].name + "</p>";
        dashboard2.append(itemDiv);
    }
}
buttonUpdate.addEventListener("click", function (event) {
    var id = Number(newID.value.trim());
    var name = newName.value.trim();
    if (!id || !name) {
        alert("Please specify both values.");
    }
    else {
        event.preventDefault();
        updateObjectInArray(userList, "id", id, { 'name': name });
    }
}, false);
displayArray(userList);
