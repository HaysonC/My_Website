# Trajectory Analysis Feature - Implementation Summary

## Overview
Added advanced trajectory analysis capabilities to the microfluidic flow analysis tool. This feature enables researchers to measure the distance of particle trajectories from the centerline of complex-shaped tubes.

## New Features

### 1. **Enable Trajectory Analysis Button**
- Located in the main control bar
- Purple/green gradient styling that changes when active
- Toggles trajectory analysis mode on/off
- Persists settings per image in localStorage

### 2. **Tube Boundary Definition**
Users can define the tube boundaries in two steps:
- **Step 1**: Draw the TOP boundary of the tube
  - Click multiple points along the top edge
  - Hold 'A' to add intermediate points for curved paths
  - Click to finish the boundary line
- **Step 2**: Draw the BOTTOM boundary of the tube
  - Same interaction pattern as top boundary
  - Can have different lengths than top boundary

### 3. **Centerline Computation**
The tool automatically computes the tube centerline by:
- Parameterizing both boundaries using arc length
- Mapping corresponding points between boundaries (handles different lengths)
- Computing midpoints to create a smooth centerline
- Displaying the centerline as a green dashed line overlay

### 4. **Distance-from-Center Calculation**
For each particle trajectory annotation:
- Computes the centroid of the trajectory path (weighted by segment lengths)
- Finds the closest point on the tube centerline
- Calculates Euclidean distance in pixels
- Converts to micrometers using the user's scale settings
- Displays centroid as a purple marker with white outline

## Data Integration

### CSV Export Enhancement
When trajectory analysis is enabled, CSV exports include an additional column:
- `dist_from_center_um`: Distance from trajectory centroid to tube centerline (in micrometers)

**Example CSV with trajectory data:**
```csv
points,num_points,dist_um,exposure_ms,vel_um_s,dist_from_center_um
120,45;130,50;140,55,3,25.6,10,2560,12.3
150,60;160,65;170,70,3,28.4,10,2840,8.7
```

### CSV Import Compatibility
The tool can import CSVs with or without the `dist_from_center_um` column:
- Legacy CSVs without trajectory data work seamlessly
- CSVs with trajectory data preserve the distance measurements
- Automatic detection of column presence

### Table Display
- New column: "Dist from Center (µm)" 
- Only visible when trajectory analysis is active
- Shows distance for each annotation with 3 decimal precision
- Empty cells for annotations without trajectory data

## Visual Indicators

### Color Coding
- **Red lines**: Top and bottom boundaries
- **Green dashed line**: Computed centerline
- **Blue lines**: Particle trajectory annotations
- **Purple markers**: Trajectory centroids
- **Cyan dots**: Start points
- **Red dots**: End points
- **Yellow dots**: Intermediate points

### Status Messages
- Real-time hints showing current step in trajectory setup
- Confirmation that centerline has been computed
- Visual feedback during boundary drawing

## Persistence & Storage

### localStorage Structure
Each image maintains two separate storage keys:
1. `standalone::{datasetId}::{imageName}` - Annotation data
2. `standalone::{datasetId}::{imageName}::trajectory` - Trajectory boundaries and centerline

### Data Preservation
- Tube boundaries persist across browser sessions
- Switching between images preserves trajectory settings per-image
- Disabling trajectory analysis allows clean removal of data
- Trajectory data is compatible with future analysis workflows

## Mathematical Implementation

### Centerline Algorithm
```javascript
// Arc length parameterization
function getArcLengths(points) {
  lengths = [0]
  for each consecutive pair:
    lengths += euclidean_distance
  return lengths
}

// Interpolation at parameter t ∈ [0,1]
function interpolatePoint(points, lengths, t) {
  targetLength = t * totalLength
  find segment containing targetLength
  compute local parameter
  return linear interpolation
}

// Centerline = midpoint of mapped boundaries
for each sample point:
  topPoint = interpolate(topBoundary, t)
  bottomPoint = interpolate(bottomBoundary, t)
  centerline[i] = (topPoint + bottomPoint) / 2
```

### Distance Calculation
```javascript
// Trajectory centroid (weighted by segment length)
function computeLineCentroid(points) {
  for each segment:
    segmentMidpoint = (point[i] + point[i+1]) / 2
    segmentLength = euclidean_distance(point[i], point[i+1])
    weightedSum += segmentMidpoint * segmentLength
    totalLength += segmentLength
  return weightedSum / totalLength
}

// Minimum distance to centerline
function distanceFromCenterline(centroid, centerline) {
  minDistance = infinity
  for each centerline point:
    distance = euclidean_distance(centroid, centerlinePoint)
    minDistance = min(minDistance, distance)
  return minDistance
}
```

## User Workflow

### Typical Usage Pattern
1. Load images from ZIP file
2. Select an image to analyze
3. Click "Enable Trajectory Analysis"
4. Draw top boundary of tube (multiple clicks, finish at end)
5. Draw bottom boundary of tube (multiple clicks, finish at end)
6. Tool computes and displays green centerline
7. Annotate particle trajectories as normal (click to start/finish, hold 'A' for curves)
8. Each trajectory automatically gets distance-from-center data
9. View distances in the table
10. Export CSV with complete trajectory analysis data

### Advanced Features
- **Complex tube shapes**: Supports curved and irregular tubes
- **Different boundary lengths**: Handles asymmetric tubes
- **Multi-point trajectories**: Accurate centroids for curved particle paths
- **Retroactive analysis**: Existing annotations get trajectory data when boundaries are defined
- **Per-image settings**: Each image maintains independent tube boundaries

## Future Compatibility

The trajectory analysis feature is designed for extensibility:

### Data Structure
All trajectory data is stored in standard formats:
- JSON in localStorage for persistence
- CSV columns for export/analysis
- Consistent naming conventions

### Analysis Integration
The `dist_from_center_um` column is ready for:
- Statistical analysis (mean, std dev, distribution)
- Velocity vs. position correlation studies
- Flow profile characterization
- Laminar flow analysis
- Particle focusing validation
- Machine learning feature extraction

### Extensibility Points
The code provides hooks for future enhancements:
- Additional boundary types (e.g., wall shear zones)
- Multiple centerline definitions
- 3D trajectory reconstruction
- Time-series analysis
- Automated boundary detection

## Technical Notes

### Performance
- Centerline computed once when boundaries are defined
- Distance calculations optimized with early termination
- Canvas rendering uses device pixel ratio for crisp displays
- Efficient arc length parameterization

### Browser Compatibility
- Uses standard Canvas API
- localStorage for persistence
- FileReader API for CSV import
- Blob API for CSV export
- No external dependencies beyond existing JSZip and UTIF

### Limitations
- Assumes 2D projection of tube
- Distance is Euclidean (not along flow path)
- Centerline computation assumes relatively smooth boundaries
- No automatic boundary detection (manual drawing required)

## Conclusion

This trajectory analysis feature significantly enhances the microfluidic analysis tool by providing quantitative position data for particle trajectories within complex-shaped tubes. The implementation is robust, user-friendly, and designed for compatibility with downstream analysis workflows.
