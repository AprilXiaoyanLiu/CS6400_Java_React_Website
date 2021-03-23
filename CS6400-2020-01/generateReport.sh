#!/usr/bin/env bash
BASEDIR=$(dirname "$0")

mkdir -p $BASEDIR/.out
pdflatex --shell-escape -output-directory=$BASEDIR/.out/ $BASEDIR/src/main/latex/phase1.tex

