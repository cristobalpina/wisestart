"use strict";

function setOnMap(polygons, map) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = polygons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var polygon = _step.value;

            polygon.setMap(map);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
function getPolygonsBy(area) {
    return $.ajax({ url: "/area/" + area + "/polygons" });
}

function colorByMarkers(polygon, markersInside) {
    if (markersInside == 0) {
        polygon.setOptions({ fillColor: "#33FFFF" });
    } else if (markersInside < 3) {
        polygon.setOptions({ fillColor: "#33FF33" });
    } else if (markersInside < 5) {
        polygon.setOptions({ fillColor: "#FFFF33" });
    } else if (markersInside < 8) {
        polygon.setOptions({ fillColor: "#FF9933" });
    } else if (markersInside < 10) {
        polygon.setOptions({ fillColor: "#FF3333" });
    } else {
        polygon.setOptions({ fillColor: "#FF0000" });
    }
}

function countMarkersInside(polygon, markers) {
    var markersInside = 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = markers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var value = _step2.value;

            if (google.maps.geometry.poly.containsLocation(value.position, polygon)) {
                markersInside++;
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return markersInside;
}
function getAreaBy(id) {
    return $.ajax({ url: "/area/" + id });
}
function getAllAreas() {
    return $.ajax({ url: "/areas" });
}
function fillSelectWithAreas(areas, select) {
    var option = '<option value="0">-- Comunas --</option>';
    select.append(option);
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = areas[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var area = _step3.value;

            var _option = '<option value="' + area.id + '">' + area.name + '</option>';
            select.append(_option);
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }
}
//# sourceMappingURL=all.js.map
