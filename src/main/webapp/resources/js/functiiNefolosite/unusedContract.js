function buildLocationsContract(location_point) {
  let location_p = {};
  location_p["descriere"] = "locatie0";
  location_p["loc_type"] = 0;

  location_point.find('[data-sub-category="location_point_contract"]').each(
      function () {
        location_p[$(this).data('key')] = $(this).val();
      });

  return location_p;
}

