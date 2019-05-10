const getUnique = (parent, child) => parent.filter(item => !child.includes(item))

exports.getUnique = getUnique
