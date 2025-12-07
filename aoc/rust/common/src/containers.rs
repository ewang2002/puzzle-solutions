/// Rotates the given two-dimensional vector (i.e., matrix) clockwise once.
///
/// # Parameters
/// - `matrix`: The matrix to rotate. It's assumed the lengths of all rows are the same.
///
/// # Returns
/// The new matrix, rotated clockwise.
pub fn rotate_clockwise<T>(matrix: Vec<Vec<T>>) -> Vec<Vec<T>> {
    let mut transposed = transpose(matrix);
    for row in &mut transposed {
        row.reverse();
    }

    transposed
}

/// Transposes a two-dimensional vector (i.e., matrix).
///
/// # Parameters
/// - `matrix`: The matrix to transpose. It's assumed the lengths of all rows are the same.
///
/// # Returns
/// The transposed matrix.
pub fn transpose<T>(matrix: Vec<Vec<T>>) -> Vec<Vec<T>> {
    if matrix.is_empty() {
        return matrix;
    }

    assert!(
        matrix.iter().all(|c| c.len() == matrix[0].len()),
        "Not all rows have the same size"
    );

    let num_cols = matrix.first().unwrap().len();
    let mut row_iters: Vec<_> = matrix.into_iter().map(|r| r.into_iter()).collect();
    let mut transposed: Vec<Vec<_>> = (0..num_cols).map(|_| Vec::new()).collect();

    // For each row in the newly transposed vector...
    for out_row in transposed.iter_mut() {
        // For each row (as an iterator) from the existing matrix...
        for it in row_iters.iter_mut() {
            // Add the first item from that iterator into the row
            out_row.push(it.next().unwrap());
        }
    }

    transposed
}

#[cfg(test)]
mod container_tests {
    use crate::containers::{rotate_clockwise, transpose};

    #[test]
    pub fn test_rotate_basic() {
        let matrix = vec![vec![1, 2, 3, 4], vec![9, 8, 7, 6]];

        let rotated_once = vec![vec![9, 1], vec![8, 2], vec![7, 3], vec![6, 4]];

        let actual_rotated = rotate_clockwise(matrix);
        assert_eq!(rotated_once, actual_rotated);

        let rotated_twice = vec![vec![6, 7, 8, 9], vec![4, 3, 2, 1]];

        let actual_rotated = rotate_clockwise(actual_rotated);
        assert_eq!(rotated_twice, actual_rotated);

        let rotated_thrice = vec![vec![4, 6], vec![3, 7], vec![2, 8], vec![1, 9]];

        let actual_rotated = rotate_clockwise(actual_rotated);
        assert_eq!(rotated_thrice, actual_rotated);

        let back_to_normal = vec![vec![1, 2, 3, 4], vec![9, 8, 7, 6]];

        assert_eq!(back_to_normal, rotate_clockwise(actual_rotated));
    }

    #[test]
    pub fn test_transpose_basic() {
        let matrix = vec![vec![1, 2, 3], vec![4, 5, 6]];

        let transposed = vec![vec![1, 4], vec![2, 5], vec![3, 6]];

        assert_eq!(transposed, transpose(matrix));
    }

    #[test]
    pub fn test_transpose_single_row() {
        let transposed = vec![vec!["hello"], vec!["world"], vec!["crystap"]];

        assert_eq!(
            transposed,
            transpose(vec![vec!["hello", "world", "crystap"]])
        );
    }
}
