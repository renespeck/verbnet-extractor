#!/usr/bin/env bash

cd "$(dirname "$0")";

echo "### Ditransitives"

echo ""
echo "## Common to 'ditrans_to' and 'ditrans_for'"
echo ""
cat ../out/ditrans_to.json ../out/ditrans_for.json | sort | uniq -d

echo ""
echo "## Common to 'ditrans_be' and 'ditrans_for'"
echo ""
cat ../out/ditrans_be.json ../out/ditrans_for.json | sort | uniq -d

echo ""
echo "## Common to 'ditrans_be' and 'ditrans_to'"
echo ""
cat ../out/ditrans_be.json ../out/ditrans_to.json | sort | uniq -d

echo ""
